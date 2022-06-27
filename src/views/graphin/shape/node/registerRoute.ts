import G6, { IGroup } from "@antv/g6";
import { RouteSVG } from "../svg";
import svg2Base64 from "../svg2Base64";

/**
 * 路由器设备
 */
export default function registerRoute() {
  G6.registerNode(
    'route',
    {
      drawShape(cfg, group) {
        console.log('========== draw route shape ==========')
        const keyShape = (group as IGroup).addShape('image', {
          attrs: {
            width: 48,
            img: svg2Base64(RouteSVG)
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
