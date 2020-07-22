package ftn.sbnz.SbnzProject.dto;

public class DroolsDTO {

    private String fileName;
    private String text;

    public DroolsDTO() {
    }

    public DroolsDTO(String fileName, String text) {
        this.fileName = fileName;
        this.text = text;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
