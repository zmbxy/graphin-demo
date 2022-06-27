import registerExecuteUnitNode from "./registerExecuteUnitNode";
import registerFusionPlatform from "./registerFusionPlatform";
import registerManagementPlatform from "./registerFusionPlatform";
import registerProtectUnit from "./registerProtectUnit";
import registerRouteNode from "./registerRoute";

export default function registerShape() {
  registerRouteNode(); // 路由器图标
  registerExecuteUnitNode(); // 执行单元图标
  registerManagementPlatform(); // 管理平台
  registerFusionPlatform(); // 多服务平台
  registerProtectUnit(); // 防护单元
}