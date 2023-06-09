#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PorkchopExpressInfraCdkStack } from '../lib/porkchop_express_infra_cdk-stack';
import { PipelineStack } from '../pipeline/pipeline-stack';

const app = new cdk.App();

const porkchopExpressStackBeta = new PorkchopExpressInfraCdkStack(app, 'PorkchopExpressInfraStackBeta', {
  env: { account: '784627546023', region: 'us-east-1' },
  stageName: 'Beta'
});

const pipelineStack = new PipelineStack(app, 'PorkchopExpressPipelineStack',{
  env: { account: '784627546023', region: 'us-east-1' },
  s3BucketName: porkchopExpressStackBeta.assetsBucket.bucketName
});

pipelineStack.deloyWebsiteStage(porkchopExpressStackBeta, "PorkchopExpressDeployWebsiteStage")