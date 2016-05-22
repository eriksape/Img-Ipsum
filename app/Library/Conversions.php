<?php

namespace App\Library;

class Conversions
{
    public static function human_filesize($size, $precision = 2)
    {
        for($i = 0; ($size / 1024) > 0.9; $i++, $size /= 1024) {}
        return round($size, $precision).['B','kB','MB','GB','TB','PB','EB','ZB','YB'][$i];
    }
}
