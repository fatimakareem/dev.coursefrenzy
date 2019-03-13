import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RecapchaService {

    constructor() { }

    isn = "../assets/Recaptcha Images/Recaptcha Images-"

    recapchaImages = [
        { img: `${this.isn}01.jpg`, text: `FFhtq` },
        { img: `${this.isn}02.jpg`, text: `ghTkn` },
        { img: `${this.isn}03.jpg`, text: `OfrHt` },
        { img: `${this.isn}04.jpg`, text: `qjRtf` },
        { img: `${this.isn}05.jpg`, text: `sbCwt` },
        { img: `${this.isn}06.jpg`, text: `pdkOs` },
        { img: `${this.isn}07.jpg`, text: `efiQx` },
        { img: `${this.isn}08.jpg`, text: `nVbra` },
        { img: `${this.isn}09.jpg`, text: `pLkub` },
        { img: `${this.isn}10.jpg`, text: `Vbnuy` },
        { img: `${this.isn}12.jpg`, text: `iYhjE` },
        { img: `${this.isn}13.jpg`, text: `zUIds` },
        { img: `${this.isn}14.jpg`, text: `pScNo` },
        { img: `${this.isn}15.jpg`, text: `xxFyt` },
        { img: `${this.isn}16.jpg`, text: `dApmt` },
        { img: `${this.isn}17.jpg`, text: `cHejp` },
        { img: `${this.isn}19.jpg`, text: `LqwRc` },
        { img: `${this.isn}20.jpg`, text: `qXfrt` },
        { img: `${this.isn}21.jpg`, text: `ZbyvC` },
        { img: `${this.isn}22.jpg`, text: `Mrysi` },
        { img: `${this.isn}23.jpg`, text: `DgEqt` },
        { img: `${this.isn}24.jpg`, text: `jXbed` },
        { img: `${this.isn}25.jpg`, text: `pStuK` },
        { img: `${this.isn}26.jpg`, text: `mCrgt` },
        { img: `${this.isn}27.jpg`, text: `ieTyu` },
        { img: `${this.isn}28.jpg`, text: `XgdzV` },
        { img: `${this.isn}29.jpg`, text: `OsYrt` },
        { img: `${this.isn}30.jpg`, text: `fgWrk` },
        { img: `${this.isn}31.jpg`, text: `iQsdh` },
        { img: `${this.isn}32.jpg`, text: `bnLnp` },
        { img: `${this.isn}33.jpg`, text: `iQrgb` },
        { img: `${this.isn}34.jpg`, text: `pHzsn` },
        { img: `${this.isn}35.jpg`, text: `ZyUie` },
        { img: `${this.isn}36.jpg`, text: `qRvbx` },
        { img: `${this.isn}37.jpg`, text: `SfciG` },
        { img: `${this.isn}38.jpg`, text: `KrXdb` },
        { img: `${this.isn}39.jpg`, text: `gWjyb` },
        { img: `${this.isn}40.jpg`, text: `Rxjod` },
        { img: `${this.isn}41.jpg`, text: `Bvkjr` },
        { img: `${this.isn}42.jpg`, text: `YodxV` },
        { img: `${this.isn}43.jpg`, text: `eyTsM` },
        { img: `${this.isn}44.jpg`, text: `ilGkx` },
        { img: `${this.isn}45.jpg`, text: `mKeqr` },
        { img: `${this.isn}46.jpg`, text: `ulbcN` },
        { img: `${this.isn}47.jpg`, text: `hBjxV` },
        { img: `${this.isn}49.jpg`, text: `AqfGu` },
        { img: `${this.isn}50.jpg`, text: `sAwio` },
        { img: `${this.isn}51.jpg`, text: `ExJua` },
        { img: `${this.isn}53.jpg`, text: `FcVbm` },
        { img: `${this.isn}54.jpg`, text: `SvJkl` },
        { img: `${this.isn}56.jpg`, text: `JrExF` }
    ]

    private datas = new BehaviorSubject<any>(null)
    data = this.datas.asObservable()
    changeData(dataa: any) {
        this.datas.next(dataa)
    }

    private imgData = new BehaviorSubject<any>(null)
    img = this.imgData.asObservable()
    changeImgData(d: any) {
        this.imgData.next(d)
    }

    capchaText = ""
    imgText = ""
    rn = Math.round(Math.random() * Math.floor(this.recapchaImages.length - 1))
    nrn

    resetImg() {
        this.nrn = Math.round(Math.random() * Math.floor(this.recapchaImages.length - 1))
        this.imgText = this.recapchaImages[this.nrn].text
        this.changeImgData(this.recapchaImages[this.nrn].img)
        return this.recapchaImages[this.nrn].img
    }

    check(): boolean {
        let text
        this.data.subscribe(res => text = res)
        // let status = this.imgText === text ? true : false
        if(this.imgText === text){
            return true
        }else{
            this.resetImg()
        }
        // this.resetImg()
        // return status
    }
}