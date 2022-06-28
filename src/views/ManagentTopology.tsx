import React from 'react';
import { cloneDeep } from 'lodash';
import { Divider, Menu } from '@arco-design/web-react';
import Graphin from './graphin/Graphin';
import ContextMenu from './graphin/components/ContextMenu';
import Tooltip from './graphin/components/Tooltip';
import Toolbar from './graphin/components/Toolbar';
import MiniMap from './graphin/plugin/mini-map';
import graphData from './data.json';

function ManagentTopology() {

  const [data /* , setData */] = React.useState(() => cloneDeep(graphData));

  return (
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
      <Toolbar direction="horizontal">
        <Toolbar.Item title="查找">
          <svg width="1rem" height="1rem" viewBox="0 0 175 175" version="1.1">
            <path d="M170.7375,150.1 L128.875,108.225 C128.3875,107.7375 127.85,107.375 127.3375,106.95 C134.4,96.1 138.5375,83.175 138.5375,69.25 C138.5375,31 107.5375,0 69.275,0 C31.025,0 0,31 0,69.2625 C0,107.525 31.025,138.525 69.275,138.525 C83.1875,138.525 96.125,134.375 107.0125,127.325 C107.4,127.8625 107.775,128.375 108.25,128.8375 L150.125,170.7375 C152.975,173.5875 156.6875,175 160.425,175 C164.1625,175 167.8875,173.5875 170.7375,170.725 C176.425,165.0375 176.425,155.8125 170.7375,150.1 M69.275,116.65 C43.15,116.65 21.875,95.3875 21.875,69.2625 C21.875,43.1375 43.15,21.8625 69.275,21.8625 C95.4,21.8625 116.6625,43.1375 116.6625,69.2625 C116.6625,95.3875 95.4,116.65 69.275,116.65" id="形状" />
          </svg>
        </Toolbar.Item>
        <Divider type="vertical" style={{ borderLeft: '1px solid #000', height: '1.25rem', margin: 0 }} />
        <Toolbar.Item title="缩小">
          <svg width="1rem" height="1rem" viewBox="0 0 112 112" version="1.1">
            <polygon points="22.5 40 66.5 40 66.5 50 22.5 50" />
            <path d="M108.5,94.5 L83,69 C87.5,62 90,53.5 90,45 C90,20 70,0 45,0 C20,0 0,20 0,45 C0,70 20,90 45,90 C54,90 62,87.5 69,83 L94.5,108.5 C96.5,110.5 99,111.5 101.5,111.5 C104,111.5 106.5,110.5 108.5,108.5 C112.5,105 112.5,98.5 108.5,94.5 L108.5,94.5 Z M44.5,80 C25,80 9.5,64.5 9.5,45 C9.5,25.5 25,10 44.5,10 C64,10 79.5,25.5 79.5,45 C79.5,64.5 64,80 44.5,80 Z" />
          </svg>
        </Toolbar.Item>
        <Toolbar.Item title="放大">
          <svg width="1rem" height="1rem" viewBox="0 0 112 112" version="1.1">
            <polygon points="49.5 23 39.5 23 39.5 40 22.5 40 22.5 50 39.5 50 39.5 67.5 49.5 67.5 49.5 50 66.5 50 66.5 40 49.5 40" />
            <path d="M108.5,94.5 L83,69 C87.5,62 90,53.5 90,45 C90,20 70,0 45,0 C20,0 0,20 0,45 C0,70 20,90 45,90 C54,90 62,87.5 69,83 L94.5,108.5 C96.5,110.5 99,111.5 101.5,111.5 C104,111.5 106.5,110.5 108.5,108.5 C112.5,105 112.5,98.5 108.5,94.5 L108.5,94.5 Z M44.5,80 C25,80 9.5,64.5 9.5,45 C9.5,25.5 25,10 44.5,10 C64,10 79.5,25.5 79.5,45 C79.5,64.5 64,80 44.5,80 Z" id="形状" />
          </svg>
        </Toolbar.Item>
        <Toolbar.Item title="屏幕自适应">
          <svg width="1rem" height="1rem" viewBox="0 0 109 111">
            <path d="M21.5625,52.5 C19.375,52.5 17.8125,54.375 17.8125,56.25 L17.8125,59.375 C17.8125,61.5625 19.6875,63.125 21.5625,63.125 C23.4375,63.125 25.3125,61.25 25.3125,59.375 L25.3125,56.25 C25.3125,54.0625 23.75,52.5 21.5625,52.5 L21.5625,52.5 Z M86.5625,50.625 C84.375,50.625 82.8125,52.5 82.8125,54.375 L82.8125,60.625 C82.8125,62.8125 84.6875,64.375 86.5625,64.375 C88.4375,64.375 90.3125,62.5 90.3125,60.625 L90.3125,54.375 C90.625,52.1875 88.75,50.625 86.5625,50.625 L86.5625,50.625 Z M86.5625,75.625 C84.375,75.625 82.8125,77.5 82.8125,79.375 L82.8125,82.5 C82.8125,84.6875 84.6875,86.25 86.5625,86.25 C88.4375,86.25 90.3125,84.375 90.3125,82.5 L90.3125,79.375 C90.625,77.1875 88.75,75.625 86.5625,75.625 Z M86.5625,28.75 C84.375,28.75 82.8125,30.625 82.8125,32.5 L82.8125,35.625 C82.8125,37.8125 84.6875,39.375 86.5625,39.375 C88.4375,39.375 90.3125,37.5 90.3125,35.625 L90.3125,32.5 C90.625,30.3125 88.75,28.75 86.5625,28.75 Z M21.5625,27.5 C19.375,27.5 17.8125,29.375 17.8125,31.25 L17.8125,37.5 C17.8125,39.6875 19.6875,41.25 21.5625,41.25 C23.4375,41.25 25.3125,39.375 25.3125,37.5 L25.3125,31.25 C25.3125,29.0625 23.75,27.5 21.5625,27.5 Z M21.5625,74.375 C19.375,74.375 17.8125,76.25 17.8125,78.125 L17.8125,84.375 C17.8125,86.5625 19.6875,88.125 21.5625,88.125 C23.4375,88.125 25.3125,86.25 25.3125,84.375 L25.3125,78.125 C25.3125,75.9375 23.75,74.375 21.5625,74.375 Z" id="形状" />
            <path d="M97.8125,0 L10.3125,0 C4.6875,0 0,4.6875 0,10.3125 L0,100.625 C0,106.25 4.6875,110.9375 10.3125,110.9375 L97.8125,110.9375 C103.4375,110.9375 108.125,106.25 108.125,100.625 L108.125,10.3125 C107.8125,4.6875 103.4375,0 97.8125,0 Z M100.3125,100.9375 C100.3125,102.1875 99.0625,103.4375 97.8125,103.4375 L90.625,103.4375 L90.625,101.5625 C90.625,99.375 88.75,97.8125 86.875,97.8125 C85,97.8125 83.125,99.6875 83.125,101.5625 L83.125,103.4375 L25.625,103.4375 C25.625,101.25 23.75,99.6875 21.875,99.6875 C20,99.6875 18.125,101.5625 18.125,103.4375 L10.3125,103.4375 C9.0625,103.4375 7.8125,102.1875 7.8125,100.9375 L7.8125,10.3125 C7.8125,9.0625 9.0625,7.8125 10.3125,7.8125 L17.8125,7.8125 C17.5,8.4375 17.5,8.75 17.5,9.375 L17.5,12.5 C17.5,14.6875 19.375,16.25 21.25,16.25 C23.125,16.25 25,14.375 25,12.5 L25,9.375 C25,8.75 25,8.4375 24.6875,7.8125 L82.5,7.8125 L82.5,13.75 C82.5,15.9375 84.375,17.5 86.25,17.5 C88.125,17.5 90,15.625 90,13.75 L90,7.8125 L97.8125,7.8125 C99.0625,7.8125 100.3125,9.0625 100.3125,10.3125 L100.3125,100.9375 Z" id="形状" />
          </svg>
        </Toolbar.Item>
        <Toolbar.Item title="居中">
          <svg width="1rem" height="1rem" viewBox="0 0 668 676">
            <rect stroke="#000000" strokeWidth="65" fill="#FFFFFF" x="10" y="10" width="648" height="656" />
            <path d="M513,374.575 L666.602,374.575 L666.602,348.977 L513,348.977 L513,374.575 Z M1,374.575 L154.602,374.575 L154.602,348.977 L1,348.977 L1,374.575 Z M461.801,246.575 L461.801,451.375 C461.801,465.516 450.34,476.977 436.199,476.977 L231.398,476.977 C217.262,476.977 205.801,465.516 205.801,451.375 L205.801,246.575 C205.801,232.438 217.262,220.977 231.398,220.977 L436.199,220.977 C450.34,220.977 461.801,232.438 461.801,246.575 Z M321,674.891 L346.602,674.891 L346.602,521.289 L321,521.289 L321,674.891 Z M321,167.602 L346.602,167.602 L346.602,14 L321,14 L321,167.602 Z" id="jueduijuzhong" stroke="#030303" fill="#000000" />
          </svg>
        </Toolbar.Item>
        <Divider type="vertical" style={{ borderLeft: '1px solid #000', height: '1.25rem', margin: 0 }} />
        <Toolbar.Item title="保存布局">
          <svg width="1rem" height="1rem" viewBox="0 0 175 175" version="1.1">
            <path d="M37.5,12.5 L18.75,12.5 C15.2982203,12.5 12.5,15.2982203 12.5,18.75 L12.5,156.25 C12.5,159.70178 15.2982203,162.5 18.75,162.5 L156.25,162.5 C159.70178,162.5 162.5,159.70178 162.5,156.25 L162.5,18.75 C162.5,15.2982203 159.70178,12.5 156.25,12.5 L137.5,12.5 L137.5,75 C137.5,81.9035594 131.903559,87.5 125,87.5 L50,87.5 C43.0964406,87.5 37.5,81.9035594 37.5,75 L37.5,12.5 Z M12.5,0 L162.5,0 C169.403559,0 175,5.59644063 175,12.5 L175,162.5 C175,169.403559 169.403559,175 162.5,175 L12.5,175 C5.59644063,175 0,169.403559 0,162.5 L0,12.5 C0,5.59644063 5.59644063,0 12.5,0 Z M50,12.5 L50,68.75 C50,72.2017797 52.7982203,75 56.25,75 L118.75,75 C122.20178,75 125,72.2017797 125,68.75 L125,12.5 L50,12.5 Z M106.25,25 C109.70178,25 112.5,27.7982203 112.5,31.25 L112.5,56.25 C112.5,59.7017797 109.70178,62.5 106.25,62.5 C102.79822,62.5 100,59.7017797 100,56.25 L100,31.25 C100,27.7982203 102.79822,25 106.25,25 Z" id="形状" />
          </svg>
        </Toolbar.Item>
        <Toolbar.Item title="重置布局">
          <svg width="1rem" height="1rem" viewBox="0 0 141 146">
            <path d="M15,120.324688 L15,125.324688 C15,129.074688 11.25,132.824688 7.5,132.824688 C3.75,132.824688 0,130.324688 0,125.324688 L0,91.5746884 C0,87.8246884 3.75,85.3246884 7.5,85.3246884 C11.25,85.3246884 13.75,87.8246884 15,91.5746884 C16.25,95.3246884 18.75,100.324688 21.25,104.074688 C33.75,124.074688 52.5,132.824688 75,131.574688 C100,129.074688 116.25,115.324688 125,92.8246884 C126.25,87.8246884 128.75,85.3246884 132.5,85.3246884 C137.5,85.3246884 141.25,89.0746884 140,94.0746884 C137.5,104.074688 132.5,111.574688 126.25,119.074688 C97.5,152.824688 48.75,154.074688 17.5,121.574688 C16.25,121.574688 16.25,121.574688 15,120.324688 L15,120.324688 Z M123.75,22.8246884 L123.75,16.5746884 C123.75,11.5746884 127.5,9.0746884 131.25,9.0746884 C135,9.0746884 138.75,11.5746884 138.75,16.5746884 L138.75,49.0746884 C138.75,52.8246884 136.25,55.3246884 133.75,56.5746884 C130,57.8246884 126.25,55.3246884 125,52.8246884 C123.75,50.3246884 122.5,46.5746884 121.25,44.0746884 C108.75,22.8246884 90,12.8246884 65,14.0746884 C41.25,16.5746884 25,30.3246884 16.25,51.5746884 C15,54.0746884 13.75,56.5746884 10,57.8246884 C3.75,57.8246884 -5.99520433e-15,52.8246884 2.5,47.8246884 C7.5,32.8246884 16.25,21.5746884 28.75,12.8246884 C58.75,-7.1753116 96.25,-3.4253116 121.25,21.5746884 C122.5,22.8246884 122.5,24.0746884 123.75,22.8246884 C123.75,24.0746884 123.75,24.0746884 123.75,22.8246884 Z" id="形状" />
          </svg>
        </Toolbar.Item>
        <Toolbar.Item title="导出图片">
          <svg width="1rem" height="1rem" viewBox="0 0 155 163" version="1.1">
            <path d="M0,0 L137.5,0 L137.5,12.5 L0,12.5 L0,0 Z M7.10542736e-15,113.25 L106.2375,113.25 L106.2375,125.75 L7.10542736e-15,125.75 L7.10542736e-15,113.25 Z" id="形状" />
            <path d="M125,0 L137.5,0 L137.5,62.5 L125,62.5 L125,0 Z M1.42108547e-14,10.2625 L12.5,10.2625 L12.5,113.25 L1.42108547e-14,113.25 L1.42108547e-14,10.2625 Z" id="形状" />
            <polygon id="路径" points="1.5 85.4125 44.125 62.5 50.0625 73.5 7.425 96.425" />
            <path d="M46.0125,61.3375 L74.3125,114.8875 L63.2625,120.725 L34.975,67.175 L46.0125,61.3375 Z M87.725,26.0125 L112.45,26.0125 L112.45,50.85 L87.725,50.85 L87.725,26.0125 Z M117.275,75.675 L142.275,75.675 L142.275,138.175 L117.275,138.175 L117.275,75.675 Z" id="形状" />
            <polygon id="路径" points="104.7875 137.5 129.775 162.5 154.7875 137.5" />
          </svg>
        </Toolbar.Item>
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
  )
}

export default ManagentTopology;
