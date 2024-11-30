import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private _configSvc: ConfigService) {
    cloudinary.config({
      cloud_name: this._configSvc.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this._configSvc.get('CLOUDINARY_API_KEY'),
      api_secret: this._configSvc.get('CLOUDINARY_SECRET_KEY'),
    });
  }

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    folder: string = 'temp',
    options?: {
      isWillExpired?: boolean;
      timeExpired?: number;
    },
  ): Promise<string> {
    let expirationTime = 3600;
    if (options?.isWillExpired) {
      expirationTime = options?.timeExpired ?? 3600;
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            public_id: `${folder}/${Date.now()}`,
            expire_at: Math.floor(Date.now() / 1000) + expirationTime, // Expiration time (in seconds)
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result?.secure_url);
          },
        )
        .end(fileBuffer);
    });
  }

  async deleteFile(publicId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result?.result === 'ok') {
          resolve('File deleted successfully');
        } else {
          reject('Failed to delete file');
        }
      });
    });
  }

  async moveFile(oldPublicId: string, newFolder: string): Promise<string> {
    const fileName = oldPublicId.split('/').pop();
    const newPublicId = `${newFolder}/${fileName}`;

    return new Promise(async (resolve, reject) => {
      try {
        // Step 1: Copy the file to the new folder (uploading again)
        const uploadResult = await cloudinary.uploader.upload(
          `https://res.cloudinary.com/${cloudinary.config().cloud_name}/image/upload/${oldPublicId}`,
          { public_id: newPublicId },
        );

        // Step 2: Delete the original file
        const deleteResult = await cloudinary.uploader.destroy(oldPublicId);

        if (deleteResult.result === 'ok') {
          resolve(`File moved successfully: ${uploadResult.secure_url}`);
        } else {
          reject('Failed to delete the original file');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
