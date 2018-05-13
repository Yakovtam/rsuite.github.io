import React from 'react';
import { Link } from 'react-router';
import { addStyle, getHeight, on } from 'dom-lib';
import { Container, Content, Row, Col, Icon } from './rsuiteSource';
import _ from 'lodash';

import Banner from './fixtures/Banner';
import Logo from './fixtures/Logo';
import ReactLogo from './fixtures/ReactLogo';
import { getDict } from './locales';
import { localePath } from './LOCALE_ENV';

const dict = getDict();

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    this._onWindowResizeListener = on(window, 'resize', this.handleWindowResize);
    this.handleWindowResize();
    const setRunning = setTimeout(() => {
      this.setState({ running: true });
      clearTimeout(setRunning);
    }, 1.7e3);
  }

  componentWillUnmount() {
    if (this._onWindowResizeListener) {
      this._onWindowResizeListener.off();
    }
  }

  handleWindowResize = () => {
    let banner = document.getElementById('banner');
    let height = parseInt(getHeight(banner)) - 20;
    let indexContent = document.getElementById('index-content');
    addStyle(indexContent, 'margin-top', (height < 0 ? 0 : height) + 'px');
  };

  render() {
    return (
      <div>
        <Banner id="banner">
          <div className="banner-content">
            <h1 className="logo">
              <Logo width={120} />
              <p style={{ marginTop: 16 }}>RSUITE</p>
            </h1>
            <p className="sub-title"> {dict.common.resume}</p>
            <div className="menu-nav">
              <Link className="hvr-underline-from-center" to={`${localePath}guide/introduction`}>
                {dict.common.guide}
              </Link>
              <a className="hvr-underline-from-center" href="/design/index.html" target="_blank">
                {dict.common.design}
              </a>
              <Link className="hvr-underline-from-center" to={`${localePath}components/overview`}>
                {dict.common.components}
              </Link>
              <Link className="hvr-underline-from-center" to={`${localePath}tools/palette`}>
                {dict.common.tools}
              </Link>
              <a
                className="hvr-underline-from-center"
                href="https://github.com/rsuite/rsuite"
                target="_blank"
              >
                GitHub
                <Icon icon="external-link" className="external-link" />
              </a>
            </div>
            <ReactLogo
              style={{
                width: '1000px',
                height: '1000px',
                left: '-251px',
                top: '-412px',
                position: 'absolute',
                zIndex: -1
              }}
              running={this.state.running}
            />
          </div>
        </Banner>
        <Content id="index-content" className="box-wrapper" />
      </div>
    );
  }
}

export default Home;
