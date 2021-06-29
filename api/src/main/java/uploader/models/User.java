package uploader.models;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity
@NamedQueries({
		@NamedQuery(name = User.GET_COUNT_BY_USERNAME, query = "SELECT COUNT(u.id) FROM User u WHERE u.username = :username") })
public class User {
	public static final String GET_COUNT_BY_USERNAME = "getCountByUsername";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String username;
	@ManyToOne(fetch = FetchType.LAZY)
	private FormOption option;
	private String fileUrl;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public FormOption getOption() {
		return option;
	}

	public void setOption(FormOption option) {
		this.option = option;
	}

	public String getFileUrl() {
		return fileUrl;
	}

	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}
}
