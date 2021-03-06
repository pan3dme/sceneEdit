﻿module ossfolder {
    import UICompenent = Pan3d.me.UICompenent
    import FrameCompenent = Pan3d.me.FrameCompenent
    import UIRenderComponent = Pan3d.me.UIRenderComponent
    import ColorType = Pan3d.me.ColorType
    import InteractiveEvent = Pan3d.me.InteractiveEvent
    import TextAlign = Pan3d.me.TextAlign
    import Rectangle = Pan3d.me.Rectangle
    import ModuleEventManager = Pan3d.me.ModuleEventManager
    import UIManager = Pan3d.me.UIManager
    import LabelTextFont = Pan3d.me.LabelTextFont
    import Dis2DUIContianerPanel = Pan3d.me.Dis2DUIContianerPanel;
    import Disp2DBaseText = Pan3d.me.Disp2DBaseText
    import UIRectangle = Pan3d.me.UIRectangle
    import baseMeshVo = Pan3d.me.baseMeshVo
    import UIMask = Pan3d.me.UIMask
    import UiDraw = Pan3d.me.UiDraw
    import UIData = Pan3d.me.UIData
    import UIAtlas = Pan3d.me.UIAtlas
    import MouseType = Pan3d.me.MouseType
    import FileVo = pack.FileVo
    import Vector2D = Pan3d.me.Vector2D
    import Vector3D = Pan3d.me.Vector3D
    import Scene_data = Pan3d.me.Scene_data
    import SampleFileVo = filelist.SampleFileVo
    import TextureManager = Pan3d.me.TextureManager
    

    export class OssListFile {
        public isOpen: boolean;
        public baseFile: FileVo;

    }
    export class FolderMeshVo extends Pan3d.me.baseMeshVo {
        public ossListFile: OssListFile
        public childItem: Array<FolderMeshVo>
        public needDraw: boolean;
        public constructor() {
            super();
        }
        public set name(value: string) {
    
            this.needDraw = true;
        }
     
        public destory(): void {
            this.pos = null;
 
            this.needDraw = null;
            this.clear = true
        }


    }
    export class FolderName extends Disp2DBaseText {
        public folderMeshVo: FolderMeshVo
        public makeData(): void {
            this.folderMeshVo = this.data;
            if (this.folderMeshVo) {

                var $uiRec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);


                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, "[9c9c9c]" + this.folderMeshVo.ossListFile.baseFile.name, 18, 50, 5, TextAlign.LEFT)



                if (this.folderMeshVo.ossListFile.isOpen) {
                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_PanRight"], 2, 7, 14, 14)

                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_FolderOpen_dark"], 20, 2, 18 * 1.4, 16 * 1.4)
                } else {
                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_PanUp"], 3, 7, 14, 14)

                    this.parent.uiAtlas.ctx.drawImage(OssFolderPanel.imgBaseDic["icon_FolderClosed_dark"], 20, 2, 18 * 1.4, 16 * 1.4)
                }

                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);

            }
        }



        public update(): void {
            this.folderMeshVo = this.data;
            if (this.folderMeshVo) {
                if (this.folderMeshVo.needDraw) {
                    this.makeData();
                    this.folderMeshVo.needDraw = false;
                }
                if (this.folderMeshVo.pos) {
                    this.ui.x = this.folderMeshVo.pos.x;
                    this.ui.y = this.folderMeshVo.pos.y;
 
                    this.ui.width = this.ui.baseRec.width * this.folderMeshVo.uiScale;
                    this.ui.height = this.ui.baseRec.height * this.folderMeshVo.uiScale;

                }
                if (this.folderMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        }
    }

    export class OssFolderPanel extends win.Dis2dBaseWindow {

        public static imgBaseDic: any
        public constructor() {
            super(FolderName, new Rectangle(0, 0, 256, 22), 48);
            this.left = 0;
            this.pageRect = new Rectangle(0, 0, 200, 200)
        }
        protected loadConfigCom(): void {
            super.loadConfigCom();

            this._baseRender.mask = this._uiMask
  
            this.loadAssetImg(() => {
                this.makeItemUiList()
                Pan3d.me.TimeUtil.addFrameTick((t: number) => { this.update(t) });
            })
        }

        private loadAssetImg(bfun: Function): void {
            OssFolderPanel.imgBaseDic = {};
            var item: Array<string> = [];
            item.push("icon_FolderClosed_dark");
            item.push("icon_FolderOpen_dark");
            item.push("icon_PanRight");
            item.push("icon_PanUp");


            var finishNum: number = 0
            for (var i: number = 0; i < item.length; i++) {
                this.loadTempOne(item[i], () => {
                    finishNum++
                    if (finishNum >= item.length) {
                        bfun();
                    }

                });
            }
        }

        private loadTempOne(name: string, bfun: Function): void {

            var tempImg = makeImage()
            OssFolderPanel.imgBaseDic[name] = tempImg;
            tempImg.onload = () => {
                bfun();
            }
            tempImg.url = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png"
            tempImg.src = Scene_data.fileuiRoot + "ui/folder/pic/" + name + ".png"

        }

     
        public update(t: number): void {
            super.update(t);

        }
         
        protected itemMouseUp(evt: InteractiveEvent): void {
  
                for (var i: number = 0; i < this._uiItem.length; i++) {
                    var $vo: FolderName = <FolderName>this._uiItem[i]
                    if ($vo.ui == evt.target) {
                        if ((evt.x - this.left) - $vo.ui.x < 20) {
                            $vo.folderMeshVo.ossListFile.isOpen = !$vo.folderMeshVo.ossListFile.isOpen;
                            if ($vo.folderMeshVo.ossListFile.isOpen) {
                                this.pushChidrenDic($vo)
                            } else {
                                this.clearChildern($vo.folderMeshVo)   //将要关闭
                            }
                          
                        } else {
                            if (!$vo.folderMeshVo.ossListFile.isOpen) {
                                this.pushChidrenDic($vo)
                            } 
                            $vo.folderMeshVo.ossListFile.isOpen = true

                            Pan3d.me.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.LIST_DIS_ALL_FILE), $vo.folderMeshVo.ossListFile.baseFile.path)
                        }

                        $vo.folderMeshVo.needDraw = true;

                      
                    }
                }
                this.refrishFolder();

            

        }
        private resetHideDic(arr: Array<FolderMeshVo>): void {

            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].clear = false
                arr[i].pos = new Vector3D();
                this.showTemp(arr[i]);
                this.resetHideDic( arr[i].childItem)
            }

        }
        private pushChidrenDic($folderName: FolderName): void {
            if ($folderName.folderMeshVo.childItem) {

                console.log("已经有了，直接显示就行")
                this.resetHideDic($folderName.folderMeshVo.childItem)
            

            } else {
                var pathurl: string = $folderName.folderMeshVo.ossListFile.baseFile.path
                pack.FileOssModel.getFolderArr(pathurl, (value: Array<FileVo>) => {
                    if (!$folderName.folderMeshVo.childItem) {
                        $folderName.folderMeshVo.childItem = []
                        for (var i: number = 0; value && i < value.length; i++) {
                            if (value[i].isFolder) {
                                var $vo: FolderMeshVo = this.getCharNameMeshVo(value[i])
                                $vo.pos = new Vector3D(0, i * 15, 0)
                                $folderName.folderMeshVo.childItem.push($vo)
                            }
                        }
                        this.refrishFolder();
                    } else {
                        console.log("已获取过，注意可能是网络问题")
                    }

                })
            }
           
      
 
        }
        private clearChildern($folderMeshVo: FolderMeshVo): void {
            if ($folderMeshVo.childItem) {
                for (var i: number = 0; i < $folderMeshVo.childItem.length; i++) {
                    var $vo: FolderMeshVo = $folderMeshVo.childItem[i];
                    $vo.destory();
                    this.clearChildern($vo)
                }
            }
        }
        private makeItemUiList(): void {
            this.fileItem = [];
            for (var i: number = 0; i < this._uiItem.length; i++) {
                this._uiItem[i].ui.addEventListener(InteractiveEvent.Up, this.itemMouseUp, this);
            }
  
            //"upfile/shadertree/"
            //
            //Pan3d.Scene_data.ossRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/";
            var rootDic: string = Pan3d.me.Scene_data.fileRoot.replace(Pan3d.me.Scene_data.ossRoot, "");
            pack.FileOssModel.getFolderArr(rootDic, (value: Array<FileVo>) => {
                for (var i: number = 0; i < value.length; i++) {
                    if (value[i].isFolder) {
                        var $vo: FolderMeshVo = this.getCharNameMeshVo(value[i])
                        $vo.pos = new Vector3D(0, i * 15, 0)

                        this.fileItem.push($vo)
                    }
                }
                this.refrishFolder();
            })

        }
        private fileItem: Array<FolderMeshVo>;
        public getCharNameMeshVo(value: FileVo): FolderMeshVo {
            var $vo: FolderMeshVo = new FolderMeshVo;
            $vo.ossListFile = new OssListFile;
            $vo.ossListFile.baseFile = value
            this.showTemp($vo);
            return $vo;
        }
        private folderCellHeight: number = 20
        private refrishFolder(): void {
            OssFolderPanel.listTy = 0;
            this.disChiendren(this.fileItem,10);
            var moveTy: number = 0
            this.moveAllTy(this.fileItem, moveTy)
 
        }
        private moveAllTy(arr: Array<FolderMeshVo>, ty: number = 0): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].pos.y += ty;  
                if (arr[i].ossListFile.isOpen) {
                    this.moveAllTy(arr[i].childItem, ty)
                }
            }

        }
        private static listTy: number
        private disChiendren(arr: Array<FolderMeshVo>, tx: number=0): void {
            for (var i: number = 0; arr && i < arr.length; i++) {
                arr[i].pos.x = tx;
                arr[i].pos.y = OssFolderPanel.listTy
                arr[i].uiScale=0.7
                OssFolderPanel.listTy += 20;
                if (arr[i].ossListFile.isOpen) {
                    this.disChiendren(arr[i].childItem, tx+20)
                }
            }
   
        }
    }
}