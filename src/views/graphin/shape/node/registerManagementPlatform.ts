import G6, { IGroup } from "@antv/g6";
import { ExecuteUnitSVG } from "../svg";
import svg2Base64 from "../svg2Base64";

/**
 * 管理平台设备。即仅部署有管理平台服务的设备
 */
export default function registerManagementPlatform() {
  G6.registerNode(
    'management-platform',
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