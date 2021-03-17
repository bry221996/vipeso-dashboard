/**
 * Generate Star Rating Display.
 *
 *
 * @param int rating
 *
 * @return string|html startHtml
 */
export default function (rating) {
  let starHtml = '<div class=\'d-flex justify-content-center\'>';
  const noColorStar = 5 - rating;

  for (let index = 0; index < rating; index += 1) {
    starHtml = `${starHtml}<span class='fa fa-star rating-checked' style='color: yellow'></span>`;
  }

  for (let index = 0; index < noColorStar; index += 1) {
    starHtml = `${starHtml}<span class='fa fa-star rating-checked' style='color: gray'></span>`;
  }

  starHtml = `${starHtml}</div>`;

  return starHtml;
}
