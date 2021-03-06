declare module Pan3d {
    class AstarUtil {
        constructor();
        static navmeshData: any;
        private static heightItem;
        private static jumpItem;
        private static aPos;
        static midu: number;
        private static astarWidth;
        private static astarHeight;
        static areaRect: Rectangle;
        static setData($tempNavMesh: any): void;
        private static _sceneVectList;
        private static _frist;
        static sceneVectList: Array<Vector3D>;
        static getJumpDataByV2d($tx: number, $ty: number): boolean;
        static minMapRect: Rectangle;
        private static mathMinMapRect;
        private static mathAreaRect;
        private static _bakData;
        static clear(): void;
        static porcessBak(tf: boolean): void;
        static getHeightByPos($pos: Vector3D): number;
        static getBaseHeightByBitmapdata($xpos: number, $ypos: number): number;
        private static getBitmapDataHight;
        static findPath($a: Vector3D, $b: Vector3D): Array<Vector3D>;
        static Path2dTo3d(result: Array<Vector2D>): Array<Vector3D>;
        static getWorldPosByStart2D(a: Vector2D): Vector3D;
        static findPath3D($a: Vector3D, $b: Vector3D): Array<Vector2D>;
        private static findStraightLine;
        static isGridCanWalk(p: Vector2D): boolean;
        static findPath2D(gridVec2DA: Vector2D, gridVec2DB: Vector2D): Array<Vector2D>;
        private static turnLineAstar;
        private static simplifyAstar;
        static findNearLinePoint($a: Vector3D, $b: Vector3D): Vector3D;
        private static moveA2B;
        static getPosIsCanMove($pos: Vector3D): boolean;
        static canwalkItem: Array<Vector2D>;
        static makeStarGraph($arr: Array<Array<number>>): void;
        static blockAry(ary: Array<Array<number>>): void;
        static blockList(ary: Array<Array<Vector2D>>): void;
        static blockPoint(p1: Vector2D, p2: Vector2D): void;
        static blockBakData: Array<Array<any>>;
        static blockRec($rec: Rectangle): void;
        static unblock(): void;
        static graphData: any;
        static getGrapIndexByPos($pos: Vector3D): Vector2D;
        static getScenePos($x: number, $y: number): Vector3D;
        static getLookAtPos($hit3D: Vector3D): Vector3D;
    }
}
