declare module prop {
    class MetaDataView {
        x: number;
        y: number;
        protected _data: any;
        protected _top: number;
        onAdd(): void;
        onRemove(): void;
        top: number;
        width: number;
        protected _width: number;
        height: number;
        protected _height: number;
        private propPanle;
        constructor(value: UiMeshSprite);
        getView(): Array<any>;
        data: any;
        ui: Array<BaseReflComponent>;
        private categoryKey;
        creat(data: Array<any>): void;
        private hideCategoryKey;
        categoryFun: Function;
        categoryClikUp(value: string): void;
        private addComponentView;
        resize(): void;
        eventKey(value: string): void;
        creatComponent(obj: any): BaseReflComponent;
        getMeshMaterialLeft2DUI($obj: Object): MeshMaterialLfetView2DUI;
        getMeshScene2DUI($obj: Object): MeshSceneView2DUI;
        getCategoryUI(value: string): Category2DUI;
        getTextField2DUI($obj: Object): TextField2DUI;
        getVec3($obj: Object): Vec3dCtrlUI;
        getVec2($obj: Object): Vec2PrameCtrlUI;
        getVec3Color($obj: Object): Vec3ColorCtrlUI;
        getComboBox($obj: Object): ComBoBoxCtrl2D;
        getCheckBox($obj: Object): CheckBox2DUI;
        getTexturue2DUI($obj: Object): Texturue2DUI;
        getMaterialPicUi($obj: Object): Material2DUI;
        getRoleMesh2DUI($obj: Object): RoleMesh2DUI;
        getRoleAnimi2DUI($obj: Object): RoleAnimi2DUI;
        getNumComponent($obj: Object): TextCtrlInput;
        getAgalFunComponent($obj: Object): AgalFunUI;
        refreshViewValue(): void;
        destory(): void;
    }
}
