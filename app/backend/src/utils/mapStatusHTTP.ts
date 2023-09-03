export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'NOT_FOUND': return 404;
    case 'BAD_REQUEST': return 400;
    case 'UNAUTHORIZED': return 401;
    case 'UNPROCESSABLE_ENTITY': return 422;
    case 'CREATED': return 201;
    default: return 500;
  }
}
