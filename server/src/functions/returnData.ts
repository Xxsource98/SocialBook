const InitGlobalFunctions = () => {
    globalThis.ReturnData = (code: StatusCodeType, data: any) => {
        return {
            code: code,
            description: data,
        }
    }

    globalThis.SendPromiseData = (res: any, data: ReturnDataType) => {
        res.status(data.code).send({
            status: data.code === 200 ? 'Success' : 'Error',
            description: data.description,
        })
    }

    globalThis.SendData = (res: any, code: StatusCodeType, data?: any) => {
        res.status(code).send({
            status: code === 200 ? 'Success' : 'Error',
            description: data ?? 'Internal Server Error',
        })
    }
}

export default InitGlobalFunctions
