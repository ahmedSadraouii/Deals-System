export function fixUmbracoMediaLink(mediaLink: string): string {
  if (mediaLink.startsWith('/media/')) {
    return `${process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME}${mediaLink}`;
  } else if (
    mediaLink.indexOf(
      `${process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME}/media`,
    ) !== -1
  ) {
    return mediaLink.replace(
      `${process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME}/media`,
      `${process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME}/umbraco/media`,
    );
  }
  return mediaLink;
}
