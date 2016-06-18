import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';
import {
    formatPlural,
    addLocaleData,
    defineMessages,
    IntlProvider,
    FormattedMessage,
    FormattedDate,
    FormattedNumber,
    FormattedPlural,
} from 'react-intl';

const Inbox = () => (
    <div>
        <h2>Inbox</h2>
        <p>
          <FormattedMessage id="app.message" values={{number:1,numCats:1}}></FormattedMessage>
          <br/>
            You have {' '}
            <FormattedNumber value={10} /> {' '}
            <FormattedPlural value={10}
                one="message"
                other="messages"
            />.
        </p>
    </div>
);

class App extends Component {
    render() {
        return (
            <div>
                <h1>React Intl + React Router Example</h1>
                <ul>
                    <li><Link to="/">Homee</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {this.props.children}
                <FormattedMessage id="app.title" values={{name:'erik'}}></FormattedMessage>
            </div>
        );
    }
}

const Home = () => (
    <div>
        <h2>Home</h2>
        <p>
            Today is {' '}
            <FormattedDate value={Date.now()} />
        </p>
    </div>
);


ReactDOM.render(
    <IntlProvider locale={global.locale} messages={global.messages}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="inbox" component={Inbox} />
            </Route>
        </Router>
    </IntlProvider>,
    document.getElementById('application')
)
