/**
* name
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var EquipEffect_PointCardBaseVo = /** @class */ (function () {
                function EquipEffect_PointCardBaseVo() {
                }
                EquipEffect_PointCardBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32(); //编号 id
                    this.equipcolor = data.getUint32(); //装备颜色
                    var baseEffectTypeLength = data.getUint32();
                    this.baseEffectType = []; //属性名1,属性名2,属性名3,属性名4,属性名5,属性名6 
                    for (var index = 0; index < baseEffectTypeLength; index++) {
                        this.baseEffectType.push(data.getUint32());
                    }
                    var baseEffectLength = data.getUint32();
                    this.baseEffect = []; //属性值1,属性值2,属性值3,属性值4,属性值5,属性值6
                    for (var index = 0; index < baseEffectLength; index++) {
                        this.baseEffect.push(data.getUint32());
                    }
                    this.sexNeed = data.getUint32(); //性别需求 
                    var scorecolorLength = data.getUint32();
                    this.scorecolor = []; //绿色评分,蓝色评分,紫色评分,橙色评分,暗金色评分
                    for (var index = 0; index < scorecolorLength; index++) {
                        this.scorecolor.push(data.getUint32());
                    }
                    var roleNeedLength = data.getUint32();
                    this.roleNeed = []; //角色需求1,角色需求2 
                    for (var index = 0; index < roleNeedLength; index++) {
                        this.roleNeed.push(data.getUint32());
                    }
                    this.bCanSale = data.getUint32(); //可否摆摊上架
                    this.dbCanSale = data.getUint32(); //点卡服可否摆摊上架
                    this.sellpricecoef = data.getUint32(); //出售价格系数 出售价格系数
                    this.endurecoef = data.getUint32(); //耐久度系数耐久度系数
                    this.suiting = data.getUint32(); //套装id
                    this.weaponid = data.getUint32(); //武器造型编号
                    this.weaponeffectid = data.getUint32(); //武器特效编号
                    var modelpathleftLength = data.getUint32();
                    this.modelpathleft = []; //左手路径1,左手路径2		装备在场景里对应的精灵
                    for (var index = 0; index < modelpathleftLength; index++) {
                        this.modelpathleft.push(data.getUTFBytes(data.getUint32()));
                    }
                    var modelpathrightLength = data.getUint32();
                    this.modelpathright = []; //右手路径1,右手路径2
                    for (var index = 0; index < modelpathrightLength; index++) {
                        this.modelpathright.push(data.getUTFBytes(data.getUint32()));
                    }
                    var socketleftLength = data.getUint32();
                    this.socketleft = []; //左手挂点1,左手挂点2			装备如果是左手，左手的挂点名
                    for (var index = 0; index < socketleftLength; index++) {
                        this.socketleft.push(data.getUTFBytes(data.getUint32()));
                    }
                    var socketrightLength = data.getUint32();
                    this.socketright = []; //右手挂点1,右手挂点2			装备如果是右手，右手的挂点名
                    for (var index = 0; index < socketrightLength; index++) {
                        this.socketright.push(data.getUTFBytes(data.getUint32()));
                    }
                    this.needCareer = data.getUTFBytes(data.getUint32()); //职业需求
                    this.eequiptype = data.getUint32();
                };
                return EquipEffect_PointCardBaseVo;
            }());
            template.EquipEffect_PointCardBaseVo = EquipEffect_PointCardBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EquipEffect_PointCardBaseVo.js.map