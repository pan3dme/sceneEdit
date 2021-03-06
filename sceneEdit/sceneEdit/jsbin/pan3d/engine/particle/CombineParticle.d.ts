declare module Pan3d {
    class CombineParticle extends EventDispatcher {
        sourceData: CombineParticleData;
        url: string;
        private _displayAry;
        private _time;
        private _maxTime;
        type: number;
        bindMatrix: Matrix3D;
        bindVecter3d: Vector3D;
        bindScale: Vector3D;
        invertBindMatrix: Matrix3D;
        private _bindTarget;
        private _bindSocket;
        private _rotationX;
        private _rotationY;
        private _rotationZ;
        private _isInGroup;
        private _groupPos;
        private _groupRotation;
        private _groupScale;
        groupMatrix: Matrix3D;
        groupRotationMatrix: Matrix3D;
        hasMulItem: boolean;
        sceneVisible: boolean;
        dynamic: boolean;
        hasDestory: boolean;
        constructor();
        displayAry: Array<Display3DParticle>;
        maxTime: number;
        bindTarget: IBind;
        bindSocket: string;
        x: number;
        y: number;
        z: number;
        setPos($xpos: number, $ypos: number, $zpos: number): void;
        setMulPos(ary: Array<Array<Array<number>>>): void;
        scaleX: number;
        scaleY: number;
        scaleZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        applyRotation(): void;
        setGroup($pos: Vector3D, $rotaion: Vector3D, $scale: Vector3D): void;
        setDataByte(byte: Pan3dByteArray): void;
        addPrticleItem($dis: Display3DParticle): void;
        private getDisplay3DById;
        setData(ary: Array<any>): void;
        updateTime(t: number): void;
        updateBind(): void;
        reset(): void;
        update(): void;
        updateItem(idx: number): void;
        readonly size: number;
        private getDisplay3D;
        destory(): void;
    }
}
