declare module maineditor {
    import Vector3D = Pan3d.me.Vector3D;
    import MaterialTree = materialui.MaterialTree;
    import MetaDataView = prop.MetaDataView;
    class ScenePojectMeshView extends MetaDataView {
        getView(): Array<any>;
        private static gridLineSprite;
        gridline: number;
        private textureChangeInfo;
        getParamItem(value: string): any;
        texture: MaterialTree;
        readonly mapname: string;
        data: any;
        private sceneProjectVo;
        campos: Vector3D;
        private _bgcolor;
        bgcolor: Vector3D;
        camrotation: Vector3D;
    }
}
