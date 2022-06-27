import G6, { IGroup } from "@antv/g6";
import { ExecuteUnitSVG } from "../svg";
import svg2Base64 from "../svg2Base64";

/**
 * 融合服务平台，即多个系统服务部署于一台设备上。如管理平台 + 路由态势、流量态势
 */
export default function registerFusionPlatform() {
  G6.registerNode(
    'fusion-platform',
    {
      drawShape(cfg, group) {
        console.log('========== draw route shape ==========')
        const keyShape = (group as IGroup).addShape('image', {
          attrs: {
            width: 64,
            height: 32,
            img: svg2Base64(ExecuteUnitSVG)
          }
        });
        return keyShape;
      },
      drawLabel(cfg, group) {
        console.log('========== draw route label ==========');
        const nodeLabel = (group as IGroup).addShape('text', {
          attrs: {

          }
        });

        return nodeLabel;
      },
    }
  )
}