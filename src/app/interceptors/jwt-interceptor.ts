import { HttpInterceptorFn } from "@angular/common/http";

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
    const accessToken = sessionStorage.getItem('accessToken');

    if(!accessToken)
        return next(req);

    const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}`}
    });
    return next(authReq);
};
