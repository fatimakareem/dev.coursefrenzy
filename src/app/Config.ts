import {Injectable} from '@angular/core';

@Injectable()
export class Config {
  public static api: String = 'https://apis.coursefrenzy.com/';
  // public static api: String = 'http://ns519750.ip-158-69-23.net:5010/';
  // public static api: String = 'https://apis.coursefrenzy.com/';
  // public static api: String = 'https://apis.coursefrenzy.com/';
  public static api2: String = 'https://apis.coursefrenzy.com/';   // For home slider
  public static staticStorageImages: String = 'https://storage.coursefrenzy.com/final/';   // For home slider
  public static VideoUrl: String = 'https://storage.coursefrenzy.com/videos/';   // Videos path
  // public static VideoUrl: String = 'https://storage.coursefrenzy.com/vid.php?video=';   // Videos path

  public static ImageUrl: String =  'https://storage.coursefrenzy.com/final/';
  // public static ImageUrl: String =  'https://ns3101486.ip-54-36-177.eu//coursefrenzydata/images/';
  public static ImageUploadUrl: any =  'https://storage.coursefrenzy.com/final_upload.php';

  // public static api: String = 'http://192.168.29.132:8000/';
}
// https://storage.coursefrenzy.com/final_upload.php storage.coursefrenzy.com/videos/