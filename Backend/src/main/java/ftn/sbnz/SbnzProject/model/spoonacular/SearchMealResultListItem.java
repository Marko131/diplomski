package ftn.sbnz.SbnzProject.model.spoonacular;

public class SearchMealResultListItem {

    private Integer id;
    private String image;
    private String title;

    public SearchMealResultListItem() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "SearchMealResultListItem{" +
                "id=" + id +
                ", image='" + image + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
