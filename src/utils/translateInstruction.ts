export default function translateInstruction(text: string): string {
  const directions: Record<string, string> = {
    north: 'شمال',
    south: 'جنوب',
    east: 'شرق',
    west: 'غرب',
    northeast: 'شمال‌شرق',
    northwest: 'شمال‌غرب',
    southeast: 'جنوب‌شرق',
    southwest: 'جنوب‌غرب',
  };

  return text
    .replace(
      /Head ([a-z\-]+) on (.+)/i,
      (_, dir, street) =>
        `به سمت ${directions[dir.toLowerCase()] || dir} در ${street} حرکت کن`,
    )
    .replace(
      /Enter the roundabout and take the (\d+)(st|nd|rd|th) exit onto (.+)/i,
      (_, num, __, street) =>
        `وارد میدان شو و از خروجی ${num} خارج شو به سمت ${street}`,
    )
    .replace(
      /Enter the roundabout and take the (\d+)(st|nd|rd|th) exit/i,
      (_, num) => `وارد میدان شو و از خروجی ${num} خارج شو`,
    )
    .replace(
      /Turn right onto (.+)/i,
      (_, street) => `به راست بپیچ به سمت ${street}`,
    )
    .replace(
      /Turn left onto (.+)/i,
      (_, street) => `به چپ بپیچ به سمت ${street}`,
    )
    .replace(/Turn right/i, () => `به راست بپیچ`)
    .replace(/Turn left/i, () => `به چپ بپیچ`)
    .replace(
      /Keep right onto (.+)/i,
      (_, street) => `در سمت راست بمان و وارد ${street} شو`,
    )
    .replace(
      /Keep left onto (.+)/i,
      (_, street) => `در سمت چپ بمان و وارد ${street} شو`,
    )
    .replace(/Keep right/i, () => `در سمت راست بمان`)
    .replace(/Keep left/i, () => `در سمت چپ بمان`)
    .replace(
      /Arrive at your destination, on the right/i,
      () => `به مقصد رسیدی، در سمت راست`,
    )
    .replace(
      /Arrive at your destination, on the left/i,
      () => `به مقصد رسیدی، در سمت چپ`,
    )
    .replace(/Arrive at your destination/i, () => `به مقصد رسیدی`)
    .replace(
      /Arrive at (.+), on the right/i,
      (_, place) => `به ${place} رسیدی، در سمت راست`,
    )
    .replace(
      /Arrive at (.+), on the left/i,
      (_, place) => `به ${place} رسیدی، در سمت چپ`,
    )
    .replace(/Arrive at (.+)/i, (_, place) => `به ${place} رسیدی`);
}
