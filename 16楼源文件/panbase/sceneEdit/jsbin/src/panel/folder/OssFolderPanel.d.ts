declare module ossfolder {
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    import Disp2DBaseText = Pan3d.me.Disp2DBaseText;
    import FileVo = pack.FileVo;
    class OssListFile {
        isOpen: boolean;
        baseFile: FileVo;
    }
    class FolderMeshVo extends Pan3d.me.baseMeshVo {
        ossListFile: OssListFile;
        childItem: Array<FolderMeshVo>;
        needDraw: boolean;
        constructor();
        name: string;
        destory(): void;
    }
    class FolderName extends Disp2DBaseText {
        folderMeshVo: FolderMeshVo;
        makeData(): void;
        update(): void;
    }
    class OssFolderPanel extends win.Dis2dBaseWindow {
        static imgBaseDic: any;
        constructor();
        protected loadConfigCom(): void;
        private loadAssetImg;
        private loadTempOne;
        update(t: number): void;
        protected itemMouseUp(evt: InteractiveEvent): void;
        private resetHideDic;
        private pushChidrenDic;
        private clearChildern;
        private makeItemUiList;
        private fileItem;
        getCharNameMeshVo(value: FileVo): FolderMeshVo;
        private folderCellHeight;
        private refrishFolder;
        private moveAllTy;
        private static listTy;
        private disChiendren;
    }
}
