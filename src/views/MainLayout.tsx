import { Layout } from '@arco-design/web-react';
import Graphin from './graphin/Graphin';
// import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';
import { cloneDeep } from 'lodash';
// import { nanoid } from 'nanoid';
import React from 'react';
import graphData from './data.json';

function MainLayout() {

  const [data, /* setData */] = React.useState(() => cloneDeep(graphData));


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
          <Graphin data={data} />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout;
