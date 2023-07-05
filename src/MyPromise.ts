enum PromiseState {
    PENDING,
    FULFILLED,
    REJECTED
}

enum CallbackType {
    THEN,
    CATCH,
    FINALLY
}

type ResolveRejectFunctionType<R> = (result: R | void) => void;
type PromiseResultType<RES, REJ> = RES | REJ | void;
type CallbackFunctionType<RES, REJ> = (promiseResult: PromiseResultType<RES, REJ>) => any;

// RES - Promise Resolve type,REJ - Promise Reject type
export class MyPromise<RES, REJ = any> {
    private callbackList: CallbackFunctionType<RES, REJ>[] = [];
    private state: PromiseState = PromiseState.PENDING;
    private promiseBodyResult: PromiseResultType<RES, REJ> = undefined;

    constructor(body: (resolve: ResolveRejectFunctionType<RES>, reject: ResolveRejectFunctionType<REJ>) => void) {
        body(this.resolve.bind(this), this.reject.bind(this));
    }

    private resolve(result: RES | void) {
        if (this.state !== PromiseState.PENDING) return;
        this.promiseBodyResult = result;
        this.state = PromiseState.FULFILLED;
        this.callbackList.forEach(callback => this.runCallback(callback));
    }

    private reject(reason: REJ | void) {
        if (this.state !== PromiseState.PENDING) return;
        this.promiseBodyResult = reason;
        this.state = PromiseState.REJECTED;
        this.callbackList.forEach(callback => this.runCallback(callback));
    }

    // CR - Callback Result, CRP_RES - Callback Return Promise Resolve type, CP_REJ - Callback Return Promise Reject type
    private addCallback<CR, CRP_RES, CRP_REJ, T extends CallbackType>
    (fnCallback: (promiseResult: any) => CR | MyPromise<CRP_RES, CRP_REJ>, type: T) {
        let callbackResolve: ResolveRejectFunctionType<CR | CRP_RES | RES>;
        let callbackReject: ResolveRejectFunctionType<CRP_REJ | REJ>;

        const callbackPromise = new MyPromise<
                (CR extends MyPromise<CRP_RES,CRP_REJ> ? CRP_RES : CR) | (T extends CallbackType.THEN ? never : RES),
                (CR extends MyPromise<CRP_RES,CRP_REJ> ? CRP_REJ : void) | (T extends CallbackType.CATCH ? never : REJ)
            >((resolve, reject) => {
                callbackResolve = resolve as ResolveRejectFunctionType<CR | CRP_RES | RES>;
                callbackReject = reject as ResolveRejectFunctionType<CRP_REJ | REJ>;
            });

        const callbackWrapper = (promiseResult: PromiseResultType<RES, REJ>) => {
            if (type + 1 !== this.state && type !== CallbackType.FINALLY) {
                this.state === PromiseState.FULFILLED
                    ? callbackResolve(promiseResult as RES)
                    : callbackReject(promiseResult as REJ);
                return;
            }
            const callbackResult = fnCallback(promiseResult);
            if (callbackResult instanceof MyPromise)
                (callbackResult)
                    .then((r) => {callbackResolve(r)})
                    .catch((r) => {callbackReject(r)});
            else
                callbackResolve(callbackResult);
        }

        if (this.state !== PromiseState.PENDING)
            this.runCallback(callbackWrapper);
        else
            this.callbackList.push(callbackWrapper);
        return callbackPromise;
    }

    private runCallback(fnCallbackWrapper: CallbackFunctionType<RES, REJ>) {
        queueMicrotask(() => fnCallbackWrapper(this.promiseBodyResult));
        // If you want to see synchronous callback work
        // fnCallbackWrapper(this.promiseBodyResult)
    }

    then<CR, CRP_RES, CRP_REJ>(onFulfilled: (result: RES) => CR | MyPromise<CRP_RES, CRP_REJ>) {
        return this.addCallback(onFulfilled, CallbackType.THEN);
    }

    catch<CR, CRP_RES, CRP_REJ>(onRejected: (reason: REJ) => CR | MyPromise<CRP_RES, CRP_REJ>) {
        return this.addCallback(onRejected, CallbackType.CATCH);
    }

    finally<CR, CRP_RES, CRP_REJ>(onFinished: (value: RES | REJ) => CR | MyPromise<CRP_RES, CRP_REJ>) {
        return this.addCallback(onFinished, CallbackType.FINALLY);
    }
}
