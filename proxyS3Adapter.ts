import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import { NodeHttpHandler } from '@smithy/node-http-handler'
import { HttpsProxyAgent } from 'hpagent'

const createReqHandler = (proxyURL: string): NodeHttpHandler => {
  const agent = new HttpsProxyAgent({ proxy: proxyURL })
  const reqHandler = new NodeHttpHandler({
    httpAgent: agent,
    httpsAgent: agent,
  })
  return reqHandler
}

const s3AdapterConfig = {
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: process.env.S3_REGION,
    // ... Other S3 configuration
    requestHandler: createReqHandler(process.env.PROXY_URL),
  },
  bucket: process.env.S3_BUCKET,
}

export default s3Adapter(s3AdapterConfig)
