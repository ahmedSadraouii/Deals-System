export function fixUmbracoMediaLink(mediaLink: string): string {
  if (mediaLink.startsWith('/media/')) {
    return `${process.env.IMAGE_REMOTE_HOSTNAME}${mediaLink}`;
  } else if (
    mediaLink.indexOf(`${process.env.IMAGE_REMOTE_HOSTNAME}/media`) !== -1
  ) {
    return mediaLink.replace(
      `${process.env.IMAGE_REMOTE_HOSTNAME}/media`,
      `${process.env.IMAGE_REMOTE_HOSTNAME}/umbraco/media`,
    );
  }
  return mediaLink;
}
