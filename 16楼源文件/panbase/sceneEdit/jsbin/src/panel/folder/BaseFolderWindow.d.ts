declare module basefolderwin {
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    import Rectangle = Pan3d.me.Rectangle;
    class BaseFolderWindow extends win.BaseWindow {
        constructor();
        setRect(value: Rectangle): void;
        resize(): void;
        getPageRect(): Rectangle;
        percentNum: number;
        private setLinePos;
        private pathUrlBg;
        protected loadConfigCom(): void;
        protected tittleMouseDown(evt: InteractiveEvent): void;
        private refrishWinSize;
        protected mouseOnTittleMove(evt: InteractiveEvent): void;
        private moveLine;
    }
}
