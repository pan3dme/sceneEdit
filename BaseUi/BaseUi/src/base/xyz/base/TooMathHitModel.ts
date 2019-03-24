﻿module xyz {

    import ObjData = Pan3d.ObjData;
    import Camera3D = Pan3d.Camera3D;
    import Vector2D = Pan3d.Vector2D;
    import Matrix3D = Pan3d.Matrix3D;
    import Rectangle = Pan3d.Rectangle
    import TestTriangle = Pan3d.TestTriangle
    import Display3D = Pan3d.Display3D
    import Engine = Pan3d.Engine
    import MathUtil = Pan3d.MathUtil
    import SceneManager = Pan3d.SceneManager
 
    export class TooMathHitModel {

        private static getViewMatrx3D(cam: Camera3D): Matrix3D {
            var viewMatrx3D: Matrix3D = new Matrix3D


            viewMatrx3D.perspectiveFieldOfViewLH(Engine.sceneCamScale, 1, 1, 1000);
            viewMatrx3D.appendScale(1, cam.cavanRect.width / cam.cavanRect.height, 1);

            return viewMatrx3D

        }
        public static testHitModel(display3D: Display3D, scene: SceneManager, mouseV2: Vector2D): number {
            if (!display3D || !display3D.objData) {
                return null;
            }
            var objData: ObjData = display3D.objData

            var mat: Matrix3D = scene.cam3D.cameraMatrix.clone();
            var viewMatrx3D: Matrix3D = scene.viewMatrx3D.clone();
            mat.append(viewMatrx3D);

            for (var i: number = 0; i < objData.indexs.length/3; i++) {
 
                var a: number = objData.indexs[i * 3 + 0]
                var b: number = objData.indexs[i * 3 + 1]
                var c: number = objData.indexs[i * 3 + 2]


                var A: Vector3D = new Vector3D(objData.vertices[a * 3 + 0], objData.vertices[a * 3 + 1], objData.vertices[a * 3 + 2])
                var B: Vector3D = new Vector3D(objData.vertices[b * 3 + 0], objData.vertices[b * 3 + 1], objData.vertices[b * 3 + 2])
                var C: Vector3D = new Vector3D(objData.vertices[c * 3 + 0], objData.vertices[c * 3 + 1], objData.vertices[c * 3 + 2])
                if (Vector3D.distance(A, B) == 0 || Vector3D.distance(A, C) == 0 || Vector3D.distance(B, C) == 0) {
                    continue;
                }
                A = display3D.posMatrix.transformVector(A);
                B = display3D.posMatrix.transformVector(B);
                C = display3D.posMatrix.transformVector(C);

               

                TestTriangle.baseTri.p1 = this.math3DWorldtoDisplay2DPos(A, mat, scene.cam3D.cavanRect);
                TestTriangle.baseTri.p2 = this.math3DWorldtoDisplay2DPos(B, mat, scene.cam3D.cavanRect);
                TestTriangle.baseTri.p3 = this.math3DWorldtoDisplay2DPos(C, mat, scene.cam3D.cavanRect);

                if (TestTriangle.baseTri.checkPointIn(mouseV2)) {

                    var camPos: Vector3D = new Vector3D(scene.cam3D.x, scene.cam3D.y, scene.cam3D.z)
                    /*
                    camPos.x = 1;
                    camPos.y = 10;
                    camPos.z = 0.2;
                    A = new Vector3D(0, 0, 0);
                    B = new Vector3D(1, 0, 0);
                    C = new Vector3D(0, 0, 1);
                    */

                    var planeNomal: Vector3D = Vector3D.calTriNormal(A, B, C, true);
                    var camNorm: Vector3D = Vector3D.getNrmByTwoVect(Vector3D.getProjPosition(planeNomal, camPos, [A, B, C]), camPos)

                    if (Vector3D.dotMulVector(planeNomal, camNorm) > 0) {
                        var D: Vector3D = A.add(B).add(C);
                        D.scaleBy(3);
                        D = scene.cam3D.cameraMatrix.transformVector(D)
                        return D.z;
                    }
 
                   // console.log("------------------", Vector3D.dotMulVector(new Vector3D(0, -1, 0), new Vector3D(0, -1, 0)))
                 
                }
            }
            return 0
        }
        //获取镜头前指定距离3D坐标点
        public static getCamFontDistent(scene: SceneManager, mouseV2: Vector2D, $depht: number): Vector3D {
            var mat: Matrix3D = scene.cam3D.cameraMatrix.clone();
            var viewMatrx3D: Matrix3D = scene.viewMatrx3D.clone();
            mat.append(viewMatrx3D);
            var v3d: Vector3D = this.mathDisplay2Dto3DWorldPos(mouseV2, scene);
            var camv3d: Vector3D = new Vector3D(scene.cam3D.x, scene.cam3D.y, scene.cam3D.z)
            var nrmV3d: Vector3D = v3d.subtract(camv3d);
            nrmV3d.normalize();
            nrmV3d.scaleBy($depht)
            camv3d=  camv3d.add(nrmV3d)
            return camv3d
        }
        public static math3DWorldtoDisplay2DPos($pos: Vector3D, mat: Matrix3D, rect: Rectangle): Vector2D {
            var p: Vector3D = mat.transformVector($pos);
            var b: Vector2D = new Vector2D;
            b.x = ((p.x / p.w) + 1) * (rect.width / 2)
            b.y = ((-p.y / p.w) + 1) * (rect.height / 2)
            return b;
        }
        public static mathDisplay2Dto3DWorldPos($point: Vector2D, scene: SceneManager): Vector3D {
            var cameraMatrixInvert: Matrix3D = scene.cam3D.cameraMatrix.clone()
            var viewMatrx3DInvert: Matrix3D = scene.viewMatrx3D.clone()
            cameraMatrixInvert.invert();
            viewMatrx3DInvert.invert();
            var a: Vector3D = new Vector3D()
            a.x = $point.x  
            a.y = $point.y 
            a.x = a.x * 2 / scene.cam3D.cavanRect.width - 1
            a.y = 1 - a.y * 2 / scene.cam3D.cavanRect.height
            a.w = 1;
            a.x = a.x * a.w
            a.y = a.y * a.w
            a = viewMatrx3DInvert.transformVector(a)
            a.z = 1;
            a = cameraMatrixInvert.transformVector(a)
            return a;

        }
       

     
      
    }
}