import G6, { IGroup } from "@antv/g6";
import { ProtectUnit } from "../svg";
import svg2Base64 from "../svg2Base64";

/**
 * 路由器设备
 */
export default function registerProtectUnit() {
  G6.registerNode(
    'protect-unit',
    {
      drawShape(cfg, group) {
        const nodeGroup = group as IGroup;
        console.log('========== draw route shape ==========')
        const keyShape = nodeGroup.addShape('image', {
          attrs: {
            width: 36,
            height: 48,
            img: svg2Base64(ProtectUnit)
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
      // update(cfg, item, updateType?) {
      //   const nodeConfig = cfg as NodeConfig;
      //   const nodeItem = item as Item;
      //   const nodeUpdateType = updateType as UpdateType;

      //   const group = nodeItem.getContainer();
      // },
    }
  )
}
