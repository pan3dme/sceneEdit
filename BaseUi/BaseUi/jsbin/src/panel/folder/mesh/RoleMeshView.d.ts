declare module filelist {
    import Material = Pan3d.me.Material;
    import MetaDataView = prop.MetaDataView;
    class RoleMeshView extends MetaDataView {
        private _roleStaticMesh;
        getView(): Array<any>;
        private animChange;
        animDic: Array<any>;
        skinMesh: Array<any>;
        private textureChangeInfo;
        private chuangeData;
        roleurl: string;
        texture: Material;
        data: any;
        getChangeRoleStr(): string;
        private isSaveNow;
        private lastTm;
        private saveTm;
        saveToSever(): void;
    }
}