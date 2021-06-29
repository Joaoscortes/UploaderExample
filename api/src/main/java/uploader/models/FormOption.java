package uploader.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity
@NamedQueries({
	@NamedQuery(name = FormOption.GET_ALL_OPTIONS, query = "SELECT o FROM FormOption o") })
public class FormOption {
	public static final String GET_ALL_OPTIONS = "getALLOPTIONS";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String otherAtt;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getOtherAtt() {
		return otherAtt;
	}
	public void setOtherAtt(String otherAtt) {
		this.otherAtt = otherAtt;
	}
}
