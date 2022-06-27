import G6, { IGroup, IShape, ModelConfig } from "@antv/g6";
import { ExecuteUnitSVG } from "../svg";
import svg2Base64 from "../svg2Base64";

/**
 * 执行单元设备。即最终进行数据包采集的设备
 */
export default function registerExecuteUnitNode() {
  G6.registerNode(
    'execute-unit',
    {
      drawShape(cfg, group) {
        const { expand } = cfg as ModelConfig;
        if (expand) {
          return (this as any).drawExpandShape(cfg as ModelConfig, group as IGroup);
        }
        return (this as any).drawCollaspedShape(cfg as ModelConfig, group as IGroup);
      },
      // 绘制收缩状态下的节点
      drawCollaspedShape(cfg: ModelConfig, group: IGroup): IShape {
        console.log('========== draw route collasped shape ==========');
        const keyShape = group.addShape('image', {
          attrs: {
            width: 64,
            height: 32,
            img: svg2Base64(ExecuteUnitSVG)
          },
          name: 'execute-unit',
        });
        return keyShape;
      },
      // 绘制展开状态下的节点
      drawExpandShape(cfg: ModelConfig, group: IGroup): IShape {
        console.log('========== draw route expand shape ==========');
        // 节点容器，最大的外圈矩形
        const keyShape = group.addShape('image', {
          attrs: {
            width: 64,
            height: 32,
            img: svg2Base64(ExecuteUnitSVG)
          },
          name: 'execute-unit',
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