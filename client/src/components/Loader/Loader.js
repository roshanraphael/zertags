const Loader = ({style}) => {
    return (
        <div class="preloader-wrapper big active" style={style}>
            <div class="spinner-layer spinner-yellow-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    )
}
export default Loader;