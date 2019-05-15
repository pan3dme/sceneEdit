/**
* @Author: LinQiuWen
* @description:D点卡服表格/DMT3手机绑定礼包
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var template;
        (function (template) {
            var PointCardBindTelAwardBaseVo = /** @class */ (function () {
                function PointCardBindTelAwardBaseVo() {
                    this.itemid = []; //角色1道具ID,角色2道具ID,角色3道具ID,角色4道具ID,角色5道具ID,角色6道具ID
                    this.itemnum = []; //角色1道具数量,角色2道具数量,角色3道具数量,角色4道具数量,角色5道具数量,角色6道具数量
                }
                PointCardBindTelAwardBaseVo.prototype.parse = function (data) {
                    this.id = data.getUint32();
                    var itemidLength = data.getUint32();
                    for (var index = 0; index < itemidLength; index++) {
                        this.itemid.push(data.getUint32());
                    }
                    var itemnumLength = data.getUint32();
                    for (var index = 0; index < itemnumLength; index++) {
                        this.itemnum.push(data.getUint32());
                    }
                };
                return PointCardBindTelAwardBaseVo;
            }());
            template.PointCardBindTelAwardBaseVo = PointCardBindTelAwardBaseVo;
        })(template = data_1.template || (data_1.template = {}));
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=PointCardBindTelAwardBaseVo.js.map