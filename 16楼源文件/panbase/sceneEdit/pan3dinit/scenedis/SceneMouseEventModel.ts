﻿
module scenedis.me {


    export class SceneMouseEventModel {
        private static _instance: SceneMouseEventModel;
        public static getInstance(): SceneMouseEventModel {
            if (!this._instance) {
                this._instance = new SceneMouseEventModel();
            }
            return this._instance;
        }
        public constructor() {
        }
        public initSceneFocueEvent(): void {
            Pan3d.me.Scene_data.uiBlankStage.addEventListener(Pan3d.me.InteractiveEvent.Down, this.onMouseDown, this);
            Pan3d.me.Scene_data.uiBlankStage.addEventListener(Pan3d.me.InteractiveEvent.Up, this.onMouseUp, this);
            Pan3d.me.Scene_data.uiBlankStage.addEventListener(Pan3d.me.InteractiveEvent.Move, this.onMouseMove, this);
            document.addEventListener(Pan3d.me.MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) });
        }
        public onMouseWheel($evt: MouseWheelEvent): void {

            Pan3d.me.Scene_data.cam3D.distance += $evt.wheelDelta / 10
        }

        private lastRotationY: number = 0;
        private lastRotationX: number = 0;


        private _lastMousePos: Pan3d.me.Vector2D = new Pan3d.me.Vector2D();
        private _isMouseDown: boolean;
        private onMouseMove($evt: Pan3d.me.InteractiveEvent): void {
            if (this._isMouseDown) {
                var $addx: number = $evt.x - this._lastMousePos.x;
                Pan3d.me.Scene_data.focus3D.rotationY = this.lastRotationY - $addx;

                var $addy: number = $evt.y - this._lastMousePos.y;
                Pan3d.me.  Scene_data.focus3D.rotationX = this.lastRotationX - $addy;
            }
        }
        private onMouseDown($evt: Pan3d.me. InteractiveEvent): void {

            this._lastMousePos.x = $evt.x;
            this._lastMousePos.y = $evt.y;
            this.lastRotationY = Pan3d.me.Scene_data.focus3D.rotationY;
            this.lastRotationX = Pan3d.me. Scene_data.focus3D.rotationX;
            this._isMouseDown = true;
        }
        private onMouseUp($evt: Pan3d.me.InteractiveEvent): void {
            this._isMouseDown = false;
        }
    }
}