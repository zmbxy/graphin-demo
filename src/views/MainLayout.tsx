import { Layout, Menu } from '@arco-design/web-react';
import Graphin from './graphin/Graphin';
// import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';
import { cloneDeep } from 'lodash';
// import { nanoid } from 'nanoid';
import React from 'react';
import graphData from './data.json';
import ContextMenu from './graphin/components/ContextMenu';
import Tooltip from './graphin/components/Tooltip';
import Toolbar from './graphin/components/Toolbar';
import MiniMap from './graphin/plugin/mini-map';
import svg2Base64 from './graphin/shape/svg2Base64';
import { CenterAlign } from './graphin/shape/svg';

function MainLayout() {

  const [data /* , setData */] = React.useState(() => cloneDeep(graphData));


  React.useEffect(() => {
    // setInterval(() => {
    //   console.log('========= set data =========');
    //   const newData = cloneDeep(graphData);
    //   newData.nodes[0].label = nanoid();
    //   setData(newData);
    // }, 3000);
  }, [])

  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Header
        style={{
          height: 60,
          left: 0,
          minWidth: 1100,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 100,
          backgroundColor: '#fff',
          borderBottom: '1px solid var(--color-border)',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      />
      <Layout>
        <Layout.Sider
          collapsed={true}
          style={{
            boxSizing: 'border-box',
            height: '100%',
            left: 0,
            position: 'fixed',
            top: 0,
            zIndex: 99,
            paddingTop: 60,
            width: 48,
          }}
        />
        <Layout.Content
          style={{
            backgroundColor: 'rgb(242,243,245)',
            boxSizing: 'border-box',
            minHeight: '100vh',
            minWidth: 1100,
            transition: 'padding-left .2s',
            // paddingLeft: 63,
            // paddingTop: 60,
            padding: '75px 15px 15px 63px'
          }}
        >
          <Graphin
            data={data}
            layout={{
              preventOverlap: true,
              linkDistance: 200,
              nodeStrength: -150,
              // edgeStrength: 1,
              nodeSpacing: 150,
              workerEnabled: true,
              onLayoutEnd: () => {
                console.log('========= on layout end =========');
                // this.setState({ loading: false });
              }
            }}
          >
            <Toolbar direction='horizontal'>
              <Toolbar.Item>tesst</Toolbar.Item>
              <Toolbar.Item>删除</Toolbar.Item>
              <Toolbar.Item>增加</Toolbar.Item>
              <Toolbar.Item><img src={svg2Base64(CenterAlign)} alt='' width={20}/></Toolbar.Item>
            </Toolbar>
            <ContextMenu bindType="canvas">
              <Menu>
                <Menu.Item key="1">ddd</Menu.Item>
                <Menu.Item key="2">ddd</Menu.Item>
                <Menu.Item key="3">ddd</Menu.Item>
              </Menu>
            </ContextMenu>
            <ContextMenu bindType="node">
              {() => (
                <Menu>
                  <Menu.Item key="1">ddd</Menu.Item>
                  <Menu.Item key="2">ddd</Menu.Item>
                  <Menu.Item key="3">ddd</Menu.Item>
                </Menu>
              )}
            </ContextMenu>
            <Tooltip>
              {({ item, bindType, model, id }) => {
                console.log(item, bindType, model, id);
                return (
                  <Menu>
                    <Menu.Item key="1">ddd</Menu.Item>
                    <Menu.Item key="2">ddd</Menu.Item>
                    <Menu.Item key="3">ddd</Menu.Item>
                  </Menu>
                );
              }}
            </Tooltip>
            <MiniMap visible={true} />
          </Graphin>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout;
