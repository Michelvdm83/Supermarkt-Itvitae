package com.java55.supermarktitvitae;

import com.java55.supermarktitvitae.customer.Customer;
import com.java55.supermarktitvitae.customer.CustomerRepository;
import com.java55.supermarktitvitae.manager.Manager;
import com.java55.supermarktitvitae.manager.ManagerRepository;
import com.java55.supermarktitvitae.product.Category;
import com.java55.supermarktitvitae.product.Product;
import com.java55.supermarktitvitae.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {
    private final ProductRepository productRepository;
    private final ManagerRepository managerRepository;
    private final CustomerRepository customerRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            List<Product> products = List.of(
                    // Fruit
                    new Product("Banaan", 3.20, "Een tros bananen.", Category.FRUIT, 2.80),
                    new Product("Appel", 2.50, "Een verse rode appel.", Category.FRUIT, 2.30),
                    new Product("Sinaasappel", 2.80, "Een sappige sinaasappel.", Category.FRUIT, 2.50),
                    new Product("Aardbei", 4.50, "Een bakje aardbeien.", Category.FRUIT, 4.00),
                    new Product("Druif", 3.70, "Een tros druiven.", Category.FRUIT, 3.40),
                    new Product("Ananas", 5.00, "Een hele ananas.", Category.FRUIT, 4.50),
                    new Product("Mango", 2.90, "Een rijpe mango.", Category.FRUIT, 2.60),
                    new Product("Blauwe bes", 4.00, "Een bakje blauwe bessen.", Category.FRUIT, 3.70),
                    new Product("Watermeloen", 6.00, "Een hele watermeloen.", Category.FRUIT, 5.50),
                    new Product("Kiwi", 2.40, "Een pak van 3 kiwi's.", Category.FRUIT, 2.20),
                    // Zuivel
                    new Product("Kaas", 5.60, "500 gram oude kaas.", Category.ZUIVEL, 5.00),
                    new Product("Melk", 1.20, "1 liter melk.", Category.ZUIVEL, 1.10),
                    new Product("Yoghurt", 2.50, "500 gram yoghurt.", Category.ZUIVEL, 2.30),
                    new Product("Boter", 3.40, "250 gram boter.", Category.ZUIVEL, 3.00),
                    new Product("Slagroom", 2.80, "200 ml slagroom.", Category.ZUIVEL, 2.50),
                    new Product("IJs", 4.00, "1 liter ijs.", Category.ZUIVEL, 3.70),
                    new Product("Hüttenkäse", 2.30, "200 gram hüttenkäse.", Category.ZUIVEL, 2.00),
                    new Product("Zure room", 2.00, "200 ml zure room.", Category.ZUIVEL, 1.80),
                    new Product("Milkshake", 3.00, "500 ml milkshake.", Category.ZUIVEL, 2.70),
                    new Product("Feta", 3.50, "200 gram feta.", Category.ZUIVEL, 3.20),
                    // Vlees
                    new Product("Kipfilet", 6.50, "1 kg kipfilet.", Category.VLEES, 6.00),
                    new Product("Biefstuk", 10.00, "500 gram biefstuk.", Category.VLEES, 9.50),
                    new Product("Varkenskotelet", 5.50, "1 kg varkenskoteletten.", Category.VLEES, 5.00),
                    new Product("Gehakt", 8.00, "1 kg gehakt.", Category.VLEES, 7.50),
                    new Product("Spek", 4.20, "200 gram spek.", Category.VLEES, 4.00),
                    new Product("Ham", 3.80, "200 gram ham.", Category.VLEES, 3.50),
                    new Product("Worst", 5.00, "500 gram worst.", Category.VLEES, 4.70),
                    new Product("Kalkoenfilet", 6.00, "1 kg kalkoenfilet.", Category.VLEES, 5.50),
                    new Product("Lamskotelet", 9.00, "500 gram lamskoteletten.", Category.VLEES, 8.50),
                    new Product("Eendenborst", 12.00, "500 gram eendenborst.", Category.VLEES, 11.50),
                    // Dranken
                    new Product("Sinaasappelsap", 3.00, "1 liter sinaasappelsap.", Category.DRANKEN, 2.80),
                    new Product("Appelsap", 2.80, "1 liter appelsap.", Category.DRANKEN, 2.50),
                    new Product("Cola", 1.50, "1 liter cola.", Category.DRANKEN, 1.30),
                    new Product("Water", 1.00, "1.5 liter mineraalwater.", Category.DRANKEN, 0.90),
                    new Product("Bier", 2.50, "500 ml bier.", Category.DRANKEN, 2.20),
                    new Product("Wijn", 8.00, "750 ml wijn.", Category.DRANKEN, 7.50),
                    new Product("Whiskey", 25.00, "700 ml whiskey.", Category.DRANKEN, 24.00),
                    new Product("Vodka", 20.00, "700 ml vodka.", Category.DRANKEN, 19.00),
                    new Product("Gin", 22.00, "700 ml gin.", Category.DRANKEN, 21.00),
                    new Product("Limonade", 1.80, "1.5 liter limonade.", Category.DRANKEN, 1.60),
                    // Groenten
                    new Product("Tomaat", 2.50, "1 kg tomaten.", Category.GROENTEN, 2.30),
                    new Product("Wortel", 1.50, "1 kg wortelen.", Category.GROENTEN, 1.30),
                    new Product("Broccoli", 3.00, "1 broccoli.", Category.GROENTEN, 2.80),
                    new Product("Sla", 1.20, "1 krop sla.", Category.GROENTEN, 1.00),
                    new Product("Komkommer", 1.80, "1 komkommer.", Category.GROENTEN, 1.50),
                    new Product("Spinazie", 2.20, "500 gram spinazie.", Category.GROENTEN, 2.00),
                    new Product("Paprika", 3.00, "1 kg paprika's.", Category.GROENTEN, 2.80),
                    new Product("Ui", 1.40, "1 kg uien.", Category.GROENTEN, 1.20),
                    new Product("Knoflook", 2.50, "500 gram knoflook.", Category.GROENTEN, 2.30),
                    new Product("Aardappel", 1.00, "1 kg aardappelen.", Category.GROENTEN, 0.90),
                    // Bakkerij
                    new Product("Brood", 2.50, "1 brood.", Category.BAKKERIJ, 2.30),
                    new Product("Croissant", 1.20, "1 croissant.", Category.BAKKERIJ, 1.00),
                    new Product("Bagel", 1.50, "1 bagel.", Category.BAKKERIJ, 1.30),
                    new Product("Baguette", 2.00, "1 baguette.", Category.BAKKERIJ, 1.80),
                    new Product("Donut", 1.00, "1 donut.", Category.BAKKERIJ, 0.90),
                    new Product("Muffin", 1.50, "1 muffin.", Category.BAKKERIJ, 1.30),
                    new Product("Taart", 5.00, "1 taart.", Category.BAKKERIJ, 4.50),
                    new Product("Vlaai", 6.00, "1 vlaai.", Category.BAKKERIJ, 5.50),
                    new Product("Koekje", 0.80, "1 koekje.", Category.BAKKERIJ, 0.70),
                    new Product("Brownie", 2.00, "1 brownie.", Category.BAKKERIJ, 1.80),
                    // Snacks
                    new Product("Chips", 2.50, "1 zak chips.", Category.SNACKS, 2.30),
                    new Product("Chocoladereep", 1.50, "1 chocoladereep.", Category.SNACKS, 1.30),
                    new Product("Popcorn", 1.80, "1 zak popcorn.", Category.SNACKS, 1.60),
                    new Product("Noten", 3.00, "200 gram gemengde noten.", Category.SNACKS, 2.80),
                    new Product("Snoep", 2.00, "1 zak snoep.", Category.SNACKS, 1.80),
                    new Product("Mueslireep", 1.20, "1 mueslireep.", Category.SNACKS, 1.00),
                    new Product("Crackers", 2.20, "1 pak crackers.", Category.SNACKS, 2.00),
                    new Product("Pretzels", 2.50, "1 zak pretzels.", Category.SNACKS, 2.30),
                    new Product("Jerky", 4.00, "100 gram beef jerky.", Category.SNACKS, 3.70),
                    new Product("Pinda's", 1.50, "200 gram pinda's.", Category.SNACKS, 1.30)
            );
            productRepository.saveAll(products);
        }
        if (managerRepository.count() == 0) {
            List<Manager> managers = List.of(
                    new Manager("pieter.van.loon@gmail.com", "Pieter van Loon", "1234"),
                    new Manager("johan.amerongen@hotmail.nl", "Johan Amerongen", "1234"),
                    new Manager("margretheartcows@outlook.com", "Margret Naaktgeboren", "1234")
            );
            managerRepository.saveAll(managers);
        }
        if (customerRepository.count() == 0) {
            List<Customer> customers = List.of(
                    new Customer("emily.clarkson@gmail.com", "Emily Clarkson", "1234"),
                    new Customer("raj.patel@yahoo.com", "Raj Patel", "1234"),
                    new Customer("li.mei@outlook.com", "Li Mei", "1234"),
                    new Customer("ahmed.khan@hotmail.com", "Ahmed Khan", "1234"),
                    new Customer("sofia.rossi@gmail.com", "Sofia Rossi", "1234")
            );
            customerRepository.saveAll(customers);
        }
    }
}

