type StatusCodeType = 200 | 400 | 500

type ReturnDataType = {
    code: StatusCodeType
    description: any
}

/*declare namespace NodeJS {
    interface Global {
        ReturnData: (code: StatusCodeType, data: any) => ReturnDataType
        SendPromiseData: (res: any, data: ReturnDataType) => void
        SendData: (res: any, code: StatusCodeType, data?: any) => void
    }
}*/

declare namespace globalThis {
    var ReturnData: (code: StatusCodeType, data: any) => ReturnDataType
    var SendPromiseData: (res: any, data: ReturnDataType) => void
    var SendData: (res: any, code: StatusCodeType, data?: any) => void
}