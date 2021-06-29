package uploader;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import uploader.models.FormOption;

@Path("options")
@Stateless
public class OptionResource {

	@Context
	protected UriInfo context;

	@PersistenceContext(unitName = "filesDatabase")
	private EntityManager em;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOptions() {
		return Response.ok(em.createNamedQuery(FormOption.GET_ALL_OPTIONS, FormOption.class).getResultList()).build();
	}
}
