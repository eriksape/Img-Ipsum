<?php

use Behat\Behat\Context\Context;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Behat\Behat\Hook\Scope\AfterStepScope;
use Illuminate\Foundation\Testing\TestCase;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Defines application features from the specific context.
 */
class FeatureContext extends TestCase implements Context, SnippetAcceptingContext
{
    /**
     * The Guzzle HTTP Client.
     */
    protected $client;

    /**
     * The current resource
     */
    protected $resource;

    /**
     * The request payload
     */
    protected $requestPayload;

    /**
     * The request files
     */
    protected $requestFiles = [];

    /**
     * The Guzzle HTTP Response.
     */
    protected $response;

    /**
     * The decoded response object.
     */
    protected $responsePayload;

    /**
     * The current scope within the response payload
     * which conditions are asserted against.
     */
    protected $scope;

    /**
     * Initializes context.
     *
     * Every scenario gets its own context instance.
     */
    public function __construct()
    {
        parent::setUp();
    }

    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost:8001';

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../../../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * @static
     * @BeforeSuite
     */
    public static function bootstrapLaravel()
    {
        // Override environment when booting Laravel
        Dotenv::load(__DIR__.'/../../../', '.env.behat');
    }

    /**
     * Begin a database transaction.
     *
     * @BeforeScenario
     */
    public static function beginTransaction()
    {
        DB::beginTransaction();
    }

    /**
     *
     * Roll it back after the scenario.
     *
     * @AfterScenario
     */
    public static function rollback()
    {
        DB::rollback();
    }

    /**
     * Verify every step
     *
     * @AfterStep
    */
    public function dumpInfoAfterFailedStep(AfterStepScope $scope)
    {
        if (!$scope->getTestResult()->isPassed()) {
            //echo "xxxxxxxxxxxNOxxxxxxxxxxx";
        }
    }

    /**
     * Checks the response exists and returns it.
     *
     * @return  Guzzle\Http\Message\Response
     */
    protected function getResponse()
    {
        if (! $this->response) {
            throw new Exception("You must first make a request to check a response.");
        }
        return $this->response;
    }

    /**
     * Returns the payload from the current scope within
     * the response.
     *
     * @return mixed
     */
    protected function getScopePayload()
    {
        $payload = $this->getResponsePayload();
        if (! $this->scope) {
            return $payload;
        }
        return $this->arrayGet($payload, $this->scope);
    }

    /**
     * Get an item from an array using "dot" notation.
     *
     * @copyright   Taylor Otwell
     * @link        http://laravel.com/docs/helpers
     * @param       array   $array
     * @param       string  $key
     * @param       mixed   $default
     * @return      mixed
     */
    protected function arrayGet($array, $key)
    {
        if (is_null($key)) {
            return $array;
        }
        // if (isset($array[$key])) {
        //     return $array[$key];
        // }
        foreach (explode('.', $key) as $segment) {
            if (is_object($array)) {
                if (! isset($array->{$segment})) {
                    return;
                }
                $array = $array->{$segment};
            } elseif (is_array($array)) {
                if (! array_key_exists($segment, $array)) {
                    return;
                }
                $array = $array[$segment];
            }
        }
        return $array;
    }

    /**
     * Return the response payload from the current response.
     *
     * @return  mixed
     */
    protected function getResponsePayload()
    {
        if (! $this->responsePayload) {
            $json = json_decode($this->getResponse()->content());
            if (json_last_error() !== JSON_ERROR_NONE) {
                $message = 'Failed to decode JSON body ';
                switch (json_last_error()) {
                    case JSON_ERROR_DEPTH:
                        $message .= '(Maximum stack depth exceeded).';
                        break;
                    case JSON_ERROR_STATE_MISMATCH:
                        $message .= '(Underflow or the modes mismatch).';
                        break;
                    case JSON_ERROR_CTRL_CHAR:
                        $message .= '(Unexpected control character found).';
                        break;
                    case JSON_ERROR_SYNTAX:
                        $message .= '(Syntax error, malformed JSON).';
                        break;
                    case JSON_ERROR_UTF8:
                        $message .= '(Malformed UTF-8 characters, possibly incorrectly encoded).';
                        break;
                    default:
                        $message .= '(Unknown error).';
                        break;
                }
                throw new Exception($message);
            }
            $this->responsePayload = $json;
        }
        return $this->responsePayload;
    }


    /**
     * @Given los siguientes valores:
     */
    public function losSiguientesValores(PyStringNode $requestPayload)
    {
        $this->requestPayload = $requestPayload;
    }

    /**
     * @Given los siguientes archivos:
     */

    public function losSiguientesArchivos(PyStringNode $requestFiles)
    {
        $this->requestFiles = [];

        $files = json_decode(str_replace("__DIRECTORY__/", storage_path('tests/'), $requestFiles), true);
        $fileNames = json_decode(str_replace("__DIRECTORY__/", '', $requestFiles), true);

        foreach ($files as $key => $file) {
            $files[$key] = $file = new UploadedFile($file, $fileNames[$key]);
        }

        print_r($files);

        $this->requestFiles = $files;
    }

    /**
     * @When /^hago una peticion ([A-Z]+) a "([^"]*)"$/
     */
    public function HagoUnaPeticionA($httpMethod, $resource)
    {
        $this->resource = $resource;

        $server = [
            'CONTENT_TYPE' => 'application/json',
            'Accept' => 'application/json',
            'HTTP_X_REQUESTED_WITH' => 'XMLHttpRequest'
        ];

        try {
            switch ($httpMethod) {
                case 'PUT':
                case 'POST':
                    $data = json_decode($this->requestPayload, true);
                    $content = json_encode($data);
                    $files = $this->requestFiles;
                    $server['CONTENT_LENGTH'] = mb_strlen($content, '8bit');
                    $this->response = $this->
                        call($httpMethod, $resource, [], [], $files, $server, $content);
                    break;
                default:
                    $this->response = $this->
                        call($httpMethod, $resource, [], [], [], $server);
                    break;
            }
        } catch (Exception $e) {
            echo $e;
            // if ($e->getResponse() === null) throw $e;
            // $this->response = $e->getResponse();
        }
    }

    /**
     * @Then /^obtengo una respuesta (\d+) del servidor$/
     */
    public function obtengoUnaRespuestaDelServidor($statusCode)
    {
        $response = $this->getResponse();
        $contentType = $response->headers->get('content-type');
        if ($contentType === 'application/json') {
            $bodyOutput = $response->content();
        } else {
            $bodyOutput = 'Output is '.$contentType.', which is not JSON and is therefore scary. Run the request manually.';
        }
        $this->assertSame((int) $statusCode, $this->getResponse()->status(), $bodyOutput);
    }

    /**
     * @Given /^la propiedad "([^"]*)" es igual a "([^"]*)"$/
     */
    public function laPropiedadEsIgualA($property, $expectedValue)
    {
        $payload = $this->getScopePayload();
        $actualValue = $this->arrayGet($payload, $property);
        $this->assertEquals(
            $actualValue,
            $expectedValue,
            "Asserting the [$property] property in current scope equals [$expectedValue]: ".json_encode($payload)
        );
    }

    /**
     * @Given /^la propiedad "([^"]*)" existe$/
     */
    public function laPropiedadExiste($property)
    {
        $payload = $this->getScopePayload();
        $message = sprintf(
            'Asserting the [%s] property exists in the scope [%s]: %s',
            $property,
            $this->scope,
            json_encode($payload)
        );
        if (is_object($payload)) {
            $this->assertTrue(array_key_exists($property, get_object_vars($payload)), $message);
        } else {
            $this->assertTrue(array_key_exists($property, $payload), $message);
        }
    }

    /**
     * @Given /^la propiedad "([^"]*)" no existe$/
     */
    public function laPropiedadNoExiste($property)
    {
        $payload = $this->getScopePayload();
        $message = sprintf(
            'Asserting the [%s] property exists in the scope [%s]: %s',
            $property,
            $this->scope,
            json_encode($payload)
        );
        if (is_object($payload)) {
            $this->assertFalse(array_key_exists($property, get_object_vars($payload)), $message);
        } else {
            $this->assertFalse(array_key_exists($property, $payload), $message);
        }
    }

    /**
     * @Given /^la propiedad "([^"]*)" es de tipo ([^"]*)$/
     */
    public function laPropiedadEsDeTipo($property, $type)
    {
        $payload = $this->getScopePayload();
        $actualValue = $this->arrayGet($payload, $property);

        switch (strtolower($type)) {
            case 'integer':
            case 'entero':
                $this->assertTrue(is_int($actualValue));
                break;
            case 'numeric':
            case 'numerico':
                $this->assertTrue(is_numeric($actualValue));
                break;
            case 'array':
                $this->assertTrue(
                    is_array($actualValue),
                    "Asserting the [$property] property in current scope [{$this->scope}] is an array: ".json_encode($payload)
                );
                break;
            case 'string':
                $this->assertTrue(is_string($actualValue));
                break;
            case 'boolean':
                $this->assertTrue(is_bool($actualValue));
                break;
            default:
                throw new Exception("Data type undefined, you can define it.", 1);

        }
    }
}
