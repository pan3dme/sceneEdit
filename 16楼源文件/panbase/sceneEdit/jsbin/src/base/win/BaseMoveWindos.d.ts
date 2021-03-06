declare module basemove {
    import UICompenent = Pan3d.me.UICompenent;
    import UIRenderComponent = Pan3d.me.UIRenderComponent;
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    import Rectangle = Pan3d.me.Rectangle;
    import UIConatiner = Pan3d.me.UIConatiner;
    import Disp2DBaseText = Pan3d.me.Disp2DBaseText;
    import UIMask = Pan3d.me.UIMask;
    import Vector2D = Pan3d.me.Vector2D;
    class BaseMoveWindos extends UIConatiner {
        private useMoseMove;
        constructor($rect?: Rectangle, $move?: boolean);
        protected _bRender: UIRenderComponent;
        protected _mRender: UIRenderComponent;
        protected _tRender: UIRenderComponent;
        protected _closeRender: UIRenderComponent;
        protected _uiMask: UIMask;
        protected mouseDown(evt: InteractiveEvent): void;
        private mouseIsDown;
        protected stageMouseMove(evt: InteractiveEvent): void;
        protected mouseUp(evt: InteractiveEvent): void;
        protected b_bottom_left: UICompenent;
        protected b_bottom_mid: UICompenent;
        protected b_bottom_right: UICompenent;
        protected b_bottom_line_left: UICompenent;
        protected b_bottom_line_right: UICompenent;
        protected b_win_close: UICompenent;
        private static maskLevel;
        protected loadConfigCom(): void;
        removeMoveEvent(): void;
        protected a_bg: UICompenent;
        protected a_tittle_bg: UICompenent;
        protected a_rigth_line: UICompenent;
        protected a_left_line: UICompenent;
        protected a_bottom_line: UICompenent;
        protected a_scroll_bar: UICompenent;
        protected a_scroll_bar_bg: UICompenent;
        protected contentHeight: number;
        setRect(value: Rectangle): void;
        private hideUiItem;
        setHideUi(value?: Array<string>): void;
        resize(): void;
        protected lastPagePos: Vector2D;
        protected lastMousePos: Vector2D;
        protected mouseMoveTaget: UICompenent;
        protected pageRect: Rectangle;
        protected tittleMouseDown(evt: InteractiveEvent): void;
        protected tittleMouseUp(evt: InteractiveEvent): void;
        protected mouseOnTittleMove(evt: InteractiveEvent): void;
        protected changeScrollBar(): void;
    }
    class Dis2dBaseWindow extends win.BaseWindow {
        protected _baseRender: UIRenderComponent;
        constructor($classVo: any, $rect: Rectangle, $num: number);
        protected creatBaseRender(): void;
        private initData;
        private mathSize;
        private _textureRect;
        private _voNum;
        private _voRect;
        protected _uiItem: Array<Disp2DBaseText>;
        protected _lostItem: Array<Pan3d.me.baseMeshVo>;
        private makeBaseUi;
        showTemp($data: any): Disp2DBaseText;
        private clearLostItem;
        playLost(): void;
        clearOneTemp(): void;
        clearTemp($data: any): void;
        getVoByData(value: any): Disp2DBaseText;
        getVoByUi($ui: UICompenent): Disp2DBaseText;
        clearAll(): void;
        private updateFun;
        update(t: number): void;
        getUiItemLen(): number;
    }
}
