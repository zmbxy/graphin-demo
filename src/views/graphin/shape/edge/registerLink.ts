import G6, { IGroup, Item } from "@antv/g6"
import { CloseSVG } from "../svg";
import svg2Base64 from "../svg2Base64";

export default function registerLink() {
  G6.registerEdge(
    'state-link',
    {
      afterDraw(cfg, group) {
        const lineGroup = group as IGroup;
        const shape = lineGroup.get('children')[0];
        // 获取路径图形的中点坐标
        const midPoint = shape.getPoint(0.5);
        lineGroup.addShape('image', {
          attrs: {
            width: 16,
            height: 16,
            img: svg2Base64(CloseSVG),
            x: midPoint.x - 8,
            y: midPoint.y - 8,
          },
          name: 'line-close-icon'
        })
      },
      afterUpdate(cfg, item) {
        const lineItem = item as Item;
        const lineShape = lineItem.get('keyShape');
        const group = lineItem.getContainer();
        const closeIcon = group.findAllByName('line-close-icon')[0];
        const midPoint = lineShape.getPoint(0.5);
        closeIcon.attr({
          x: midPoint.x - 8,
          y: midPoint.y - 8,
        })
      },
    },
    'line'
  )
}