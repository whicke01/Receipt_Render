CarrierWave.configure do |config|
  config.fog_provider = 'fog/google'
  config.fog_credentials = {
      provider:               'Google',
      google_storage_access_key_id: ENV['GOOGLE_ACCESS_KEY_ID'],
      google_storage_secret_access_key: ENV['GOOGLE_ACCESS_SECRET_KEY']

      #google_project:         ENV['GOOGLE_ACCESS_KEY_ID'], #'my-project',
      #google_json_key_string: ENV['GOOGLE_ACCESS_SECRET_KEY'] #'xxxxxx'
      # or use google_json_key_location if using an actual file
  }
  if Rails.env.production?
    config.fog_directory = ENV['GOOGLE_CLOUD_STORAGE_BUCKET_NAME'] #'google_cloud_storage_bucket_name'
  else
    config.fog_directory = ENV['GOOGLE_CLOUD_STORAGE_TESTING_BUCKET']
  end
end
