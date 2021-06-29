package uploader;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import uploader.models.User;

@Path("users")
@Stateless
public class UserForm {

	@Context
	protected UriInfo context;

	@PersistenceContext(unitName = "filesDatabase")
	private EntityManager em;

	@GET
	@Path("/validUsername/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getFile(@PathParam("username") String username) {
		long count = em.createNamedQuery(User.GET_COUNT_BY_USERNAME, Long.class).setParameter("username", username)
				.getSingleResult();
		if (count == 0) {
			return Response.ok(true).build();
		}
		return Response.ok(false).build();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response uploadFile(User user) {
		try {
			em.persist(user);
			return Response.ok(user).build();
		} catch (PersistenceException e) {
			throw new IllegalArgumentException(e.getCause().getCause().getMessage());
		}

	}
}