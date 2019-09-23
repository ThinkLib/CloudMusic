import {Ajax,severAddress} from "./request";
export default {
    Login(data,callback,error) {
        Ajax({
            url:"/open/netase/login/"+(data.phone?'cellphone':''),
            method:"GET",
            data:data,
            success:callback,
            error:error
        })
    },
    Register(data,callback,error) {
        Ajax({
            url:"/open/netase/register/cellphone",
            data:data,
            success:callback,
            error:error
        })
    },
    UserInfo(callback,error) {
        Ajax({
            url:"/service/user/UserInfo",
            data:[],
            success:(rs)=>{
                rs[0].birth=this.age(rs[0].birthday);
                rs[0].userhead=severAddress()+'/'+rs[0].userhead+'?'+Date.now();
                callback(rs);
            },
            error:error
        })
    },
    ReSend(data,callback,error) {
        Ajax({
            url:"/service/user/resend",
            data:data,
            success:callback,
            error:error
        })
    },
    Update(data,callback,error) {
        Ajax({
            url:"/service/user/UpdateUserInfo",
            data:data,
            upload:true,
            success:callback,
            error:error
        })
    },
    FeedBack(data,callback,error) {
        Ajax({
            url:"/service/user/SendCouple",
            data:data,
            success:callback,
            error:error
        })
    },
    ChangePass(data,callback,error) {
        Ajax({
            url:"/service/user/ChangePass",
            data:data,
            success:callback,
            error:error
        })
    },
    ChangeSafeEmail(data,callback,error) {
        Ajax({
            url:"/service/user/ChangeSafeEmail",
            data:data,
            success:callback,
            error:error
        })
    },
    age(birth){
        birth = Date.parse(birth?birth:"".replace('/-/g', "/"));
        return parseInt((new Date() - new Date(birth)) / (1000 * 60 * 60 * 24 * 365));
    }
}
