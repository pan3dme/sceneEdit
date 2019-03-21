﻿module inputres {
    import Scene_data = Pan3d.Scene_data
    import FBO = Pan3d.FBO
    import Display3D = Pan3d.Display3D
    import MathClass = Pan3d.MathClass
    import Engine = Pan3d.Engine
    
    import LoadManager = Pan3d.LoadManager;
    import ObjDataManager = Pan3d.ObjDataManager;


    export class SceneRes extends Pan3d.SceneRes {
        public bfun: Function;
        public readScene(): void {
            super.readScene()
            this.bfun();
        }
    }

    export class ImputGameResModel {
        private static _instance: ImputGameResModel;
        public static getInstance(): ImputGameResModel {
            if (!this._instance) {
                this._instance = new ImputGameResModel();
            }
            return this._instance;
        }
        public loadSceneByUrl(): void {
            var sceneRes: SceneRes = new SceneRes();
            sceneRes.bfun = () => {
                 console.log("sceneres", sceneRes)
 
                ObjDataManager.getInstance().getObjData(Scene_data.fileRoot + "working/scene007/dae/scene007_01_0.xml", ($obj: ObjData) => {
                    this.meshObjdataToSever($obj)

                });
            }
 
            LoadManager.getInstance().load(Scene_data.fileRoot +"pan/expmapinfo.txt", LoadManager.BYTE_TYPE, ($byte: ArrayBuffer) => {
                sceneRes.loadComplete($byte);
      
            });
 
        }
        public meshObjdataToSever(objdata: ObjData): void {

            var obj: any = {};
            var tw: number = objdata.stride/4
            obj.vertices = this.readChangeBuff(objdata.dataView, 3, 0, tw);
            obj.uvs = this.readChangeBuff(objdata.dataView, 2, 3, tw);
            obj.lightUvs = this.readChangeBuff(objdata.dataView, 2, 5, tw);
            obj.normals = obj.vertices
            obj.indexs = objdata.indexs

            for (var i: number = 0; i < obj.vertices.length; i++) {
                obj.vertices[i]*=0.1 //输小;
            }
            var $fileUrl: string = Pan3d.Scene_data.fileRoot + "pan/expmapinfo.objs";
            var $file: File = new File([JSON.stringify(obj)], "expmapinfo.objs");
            var pathurl: string = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.upOssFile($file, pathurl, () => {
                console.log("上传完成")
              
            })
   
 
        }
        private readChangeBuff(data: DataView, $dataWidth: number, $offset: number, $stride: number): Array<number> {

            var $arr: Array<number> = new Array
            var len: number = data.byteLength / (4 * $stride)
            for (var i: number = 0; i < len; i++) {
                var pos: number = $stride * i + $offset;
                for (var j: number = 0; j < $dataWidth; j++) {
                    var id: number = (pos + j) * 4
                    var num = data.getFloat32(id, true);
                    data.setFloat32(id, num, true);
                    $arr.push(num)
                }
            }
            return $arr
        }
    }
}
