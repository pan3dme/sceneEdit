var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var pack;
(function (pack) {
    var PrefabStaticMesh = /** @class */ (function (_super) {
        __extends(PrefabStaticMesh, _super);
        function PrefabStaticMesh() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(PrefabStaticMesh.prototype, "materialInfoArr", {
            get: function () {
                return this._materialInfoArr;
            },
            set: function (value) {
                this._materialInfoArr = value;
            },
            enumerable: true,
            configurable: true
        });
        return PrefabStaticMesh;
    }(pack.Prefab));
    pack.PrefabStaticMesh = PrefabStaticMesh;
})(pack || (pack = {}));
//# sourceMappingURL=PrefabStaticMesh.js.map