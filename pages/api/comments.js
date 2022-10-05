import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI =
  'https://api-us-east-1.hygraph.com/v2/cl83vofrh1bhi01ujcrdc4izv/master';
const graphcmsToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjM1MjIzOTEsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2w4M3ZvZnJoMWJoaTAxdWpjcmRjNGl6di9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNGRhYzZhMDgtZWNkOS00OWQ5LWE0NjctNTQ5NjMxNmI0MWNjIiwianRpIjoiY2w4N21hNDR1MG9pcTAxdWgwZ3F2Mjc0dCJ9.ShQF-spSfphdiuOAS54elivE6OVILMgFLmU9A-eg9h8VNHm61VxhUQOXSPP2QumQYCyONP6Niiag5YVZaxscCl1VyqYKRcDjyTWOMpH3hfZ-EboQVl3bgpStVUQaZctd_nQH6TY_bP-7ZmqE1wAhfrKQeHc73X90h4lKjI3BnC92zOsWYUtNU8mxQy6hETVCHW0DSiEUSUJcs42mif7ORgJIkbsItFhXUPYP0LOGS1Koj--686jICKaTN-ZgaPviiuiaiGFR82RWCx_oAvQV2VLGAmWhZhULqtkPpDrpfVKKDPMBCOA0Gbgc9KTZLQZW7SpjcZdSlJDlS_UoxQEzYg8IogVTw32Xooyi8oDx9iLlIla-Ak7spM5_ZimD-HTLEYWVDK9w-xuH9o3lrRVedfv_iHOxDWbErR-ItMGxC6zf9JD1c-uTjSora6Is0RWcBo4ISSV2SYCtCC9K322mUpNzNO9ZEJ3hyyr7KXjLTSO2ZjTwvSDGj3O5raqjNgX-CCLtEGpKQSUrE8vc8hBLRyLD6GxOjxZn6n_cmLm36RiuzK1BqbvFNainUPGcN7Mbsovo4lMyWEKUPyYyjzx5r3GlW1GHj9AWLxzI2t8KR7Vk6bFipU6ZhoyKMWvfxUAeLVccVwzw88njNV0dTgkO2aYXykR7T-9mu-PopCWV2dc';

export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    header: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
