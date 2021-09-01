import { MailOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, Link } from 'react-router-dom';
import './microApp';
import reportWebVitals from './reportWebVitals';
import Routers from './router';
console.log("LENG ~ Routers", Routers)
class App extends React.Component {
  get isMicro() {
    return window.__MICRO_APP_ENVIRONMENT__
  }
  public render() {
    // const RouterContent: any = this.isMicro ? HashRouter : BrowserRouter;
    // basename={window.__MICRO_APP_BASE_URL__}
    return <HashRouter >
      <Layout>
        <Layout.Header>
          <Menu mode="horizontal">
            {Routers.RouterConfig.map(item => <Menu.Item key={String(item.path)} icon={<MailOutlined />}>
              <Link to={String(item.path)}>
                {item.name}
              </Link>
            </Menu.Item>)}
          </Menu>
        </Layout.Header>
        <Layout.Content>
          {Routers.Routers}
        </Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </HashRouter>
  }
}

ReactDOM.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
